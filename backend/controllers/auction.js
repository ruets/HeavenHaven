const { PrismaClient } = require("@prisma/client");
const emailjs = require("@emailjs/nodejs");
const schedule = require("node-schedule");

/**
 * This function returns one auction from an id.
 * @param {*} req   Request
 * @param {*} res   JSON response
 * @param {*} next  next callback
 */
exports.getOne = async (req, res, next) => {
    const prisma = new PrismaClient();

    try {
        try {
            //We need to find the auction from the id
            let auction = await prisma.Auction.findUnique({
                where: {
                    id: parseInt(req.params.id),
                },
            });
            //If the auction is found, we send the response
            res.status(200).json(auction);
        } catch (error) {
            //Otherwise, we throw an error
            res.status(400).json({
                error: "Intern error with error code 400 : " + error,
            });
        }
    } catch (error) {
        res.status(500).json({
            error: "Intern error with error code 500 : " + error,
        });
    }
};

/**
 * This function performs a bidding on an auction
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.bid = async (req, res, next) => {
    const prisma = new PrismaClient();

    try {
        try {
            //First, we find the auction corresponding to the id
            let auction = await prisma.Auction.findUnique({
                where: {
                    id: parseInt(req.params.id),
                },
            });

            //We need to get the last bid done. So we get the first in inverse order
            let lastBid = await prisma.Bid.findFirst({
                where: {
                    auctionId: parseInt(req.params.id),
                },
                orderBy: {
                    //Desc order
                    price: "desc",
                },
            });

            //Then, we check that the bidder is not the initiator. 
            //This means that a seller cannot bid on its own auction
            if (auction.initiatorId !== req.auth.id) {

                //Then, we need the auction to be in the "started" status
                if (auction && auction.status === "started") {

                    //We verify the price constraints. To bid, we need the bidding amount to be below the reserve price of the auction
                    //Also, the last bid price must be below the new bid
                    if (
                        auction.reservePrice <= req.body.price ||
                        (lastBid && lastBid.price < req.body.price)
                    ) {
                        //Then, we check that the last bidder is not the current user
                        if (!lastBid || lastBid.userId !== req.auth.id) {
                            
                            //If all the conditions are verified, we create a new bid
                            let bid = await prisma.Bid.create({
                                data: {
                                    //The price to bid in the auction
                                    price: req.body.price,
                                    bidder: {
                                        connect: {
                                            //We connect the bid to the current user
                                            id: req.auth.id,
                                        },
                                    },
                                    auction: {
                                        connect: {
                                            //We connect the related auction
                                            id: auction.id,
                                        },
                                    },
                                },
                            });
                            //We send the response
                            res.status(200).json(bid);
                        } else {
                            res.status(400).json({
                                //If an user tries to bid twice, we send an error
                                error: "You can't bid twice !",
                            });
                        }
                    } else {
                        //If the bid is not valid, we send an error
                        res.status(400).json({
                            error: "Price is not superior to the last bid !",
                        });
                    }
                } else {
                    //If the auction is not found, we send an error
                    res.status(400).json({
                        error: "Auction not found or not in progress !",
                    });
                }
            } else {
                res.status(400).json({
                    //If the user tries to bid on his own auction, we send an error
                    error: "You can't bid on your own auction !",
                });
            }
        } catch (error) {
            res.status(400).json({
                error: "Intern error with error code 400 : " + error,
            });
        }
    } catch (error) {
        res.status(500).json({
            error: "Intern error with error code 500 : " + error,
        });
    }
};

/**
 * This function sends the last bid to the response
 * @param {*} req   Request
 * @param {*} res   JSON response
 * @param {*} next  next callback
 */
exports.getLastBid = async (req, res, next) => {
    const prisma = new PrismaClient();

    try {
        try {
            //We find the first bid in desc order
            let bid = await prisma.Bid.findFirst({
                where: {
                    auctionId: parseInt(req.params.id),
                },
                orderBy: {
                    //Desc order
                    price: "desc",
                },
            });
            //We send the bid
            res.status(200).json(bid);
        } catch (error) {
            //If not found, we send an error
            res.status(400).json({
                error: "Intern error with error code 400  :" + error,
            });
        }
    } catch (error) {
        res.status(500).json({
            error: "Intern error with error code 500 : " + error,
        });
    }
};

/**
 * This functions initializes a new auction related to an island
 * @param {*} island    The island related
 */
exports.init = async (island) => {
    const prisma = new PrismaClient();

    //First, we get the island related to the auction to initialize
    let auction = await prisma.Auction.findUnique({
        where: {
            islandId: island.id,
        },
        include: {
            island: true,
        },
    });


    /*
     * An inportant step is to format the dates according to the database constraints. After splitting the original dates,
     * we create a Date object. 
     * We have :
     * splitStartDate[0] => the year
     * splitStartDate[1] => the month
     * splitStartDate[2] => the day
     */

    //We split the start and end date of the auction to separate days, months and years
    let splitStartDate = auction.startDate.split("-");
    let splitEndDate = auction.endDate.split("-");

    let startingDate = new Date(
        splitStartDate[0],
        splitStartDate[1] - 1,      //We need to minus one to the month because of the way javascript handles dates
        splitStartDate[2],
        0, //The hour
        0, //The minute
        0  //The second
    );
    let endingDate = new Date(
        splitEndDate[0],
        splitEndDate[1] - 1,        //We need to minus one to the month because of the way javascript handles dates
        splitEndDate[2],
        0, //The hour
        0, //The minute
        0 //The second
    );

    /** 
     * An auction has multiple status during its lifecycle. When created, the status is "pending", meaning that the auction has
     * not started yet. We need a way to wait a certain amount of time to start or end an auction at the right moment. 
     * For this, we use a scheduleJob object, that will handle the asynchronous task.
     */ 

    //We initialize a scheduleJob to start the auction
    const jobStart = schedule.scheduleJob(startingDate, async () => {
        //When the starting date is reached, we perform the following :

        //If the auction is pending
        if (auction.status === "pending") {
            try {
                //We update the item
                await prisma.Auction.update({
                    where: {
                        id: auction.id,
                    },
                    data: {
                        //We change the status to started. After that the bidding is allowed
                        status: "started",
                    },
                });

                //Logging to the console
                console.log(
                    "Auction " + island.name + " (" + auction.id + ") started !"
                );
            } catch (error) {
                //We handle possible errors
                console.log(error);
            }
        }
    });

    //We initialize a scheduleJob to end the auction
    const jobEnd = schedule.scheduleJob(endingDate, async () => {
        //When the starting date is reached, we perform the following :


        /**
         * This part performs the ending of an auction. Here, we perform the following tasks :
         * - Changing the auction status to "ended"
         * - Getting the last bidder to return the winner
         * - Create a Sell, aiming to put in relation the winner and the seller
         */

        try {

            //We get the auction related
            let auction = await prisma.Auction.findUnique({
                where: {
                    islandId: island.id,
                },
                include: {
                    island: true,
                    initiator: true,
                },
            });

            //We get the last bid. We get the first in inverse order
            //If we cannot get the beat, this means that there are no bid, so the auction must be postponed
            let bid = await prisma.Bid.findFirst({
                where: {
                    auctionId: auction.id,
                },
                orderBy: {
                    //Inverse order
                    price: "desc",
                },
            });

            //We check that the auction was previously started and that there were at least one bid
            if (auction.status === "started" && bid) {
                try {
                    //If checked, we can update the status of the auction to "ended"
                    await prisma.Auction.update({
                        where: {
                            id: auction.id,
                        },
                        data: {
                            //Update the status
                            status: "ended",
                        },
                    });

                    //We now have the winner, the seller and the auction, so we can create a sell
                    await prisma.Sale.create({
                        data: {
                            //We specify the price
                            price: bid.price,
                            //The status of the selling
                            status: "pending",
                            //The related island
                            island: {
                                connect: {
                                    id: auction.islandId,
                                },
                            },
                            //The buyer (last bidder)
                            buyer: {
                                connect: {
                                    id: bid.bidderId,
                                },
                            },
                            //The seller (initiator)
                            seller: {
                                connect: {
                                    id: auction.initiatorId,
                                },
                            },
                        },
                    });

                    //We log the state into the console
                    console.log(
                        "Auction " +
                            island.name +
                            " (" +
                            auction.id +
                            ") " +
                            " ended !"
                    );
                } catch (error) {
                    console.log(error);
                }
            } else {
                try {

                    //The case where there are no bid is handeled. In this case we switch the status of the auction to "issued"
                    await prisma.Auction.update({
                        where: {
                            id: auction.id,
                        },
                        data: {
                            //Update the status
                            status: "issued",
                        },
                    });

                    //We also send an email to the buyer and the seller to notify them
                    emailjs.send(
                        "service_l3r60im",
                        "template_p8drlsa",
                        {
                            name: auction.initiator.name,
                            island_name: auction.island.name,
                            mail: auction.initiator.email,
                        },
                        {
                            publicKey: "iEM8tV4oLhBTqhQss",
                            privateKey: "U7ZNfB8u1YiHGCjyvEXtR",
                        }
                    );
                    //We lo the state of the auction
                    console.log(
                        "Auction " +
                            island.name +
                            " (" +
                            auction.id +
                            ") issued !"
                    );
                } catch (error) {
                    console.log(error);
                }
            }
        } catch (error) {
            console.log(error);
        }
    });

    //When the auction is initialize, we log all the informations
    console.log(
        "Auction " +
            auction.island.name +
            " (" +
            auction.id +
            ") will start at " +
            startingDate.toLocaleString("fr-FR", { timeZone: "Europe/Paris" }) +
            " and will end at " +
            endingDate.toLocaleString("fr-FR", { timeZone: "Europe/Paris" }) +
            " !"
    );
};
