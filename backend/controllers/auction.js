const { PrismaClient } = require("@prisma/client");
const emailjs = require("@emailjs/nodejs");
const schedule = require("node-schedule");

exports.getOne = async (req, res, next) => {
    const prisma = new PrismaClient();

    try {
        try {
            let auction = await prisma.Auction.findUnique({
                where: {
                    id: parseInt(req.params.id),
                },
            });

            res.status(200).json(auction);
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

exports.bid = async (req, res, next) => {
    const prisma = new PrismaClient();

    try {
        try {
            let auction = await prisma.Auction.findUnique({
                where: {
                    id: parseInt(req.params.id),
                },
            });

            if (auction && auction.status === "started") {
                let bid = await prisma.Bid.create({
                    data: {
                        price: req.body.price,
                        bidder: {
                            connect: {
                                id: req.auth.id,
                            },
                        },
                        auction: {
                            connect: {
                                id: auction.id,
                            },
                        },
                    },
                });

                res.status(200).json(bid);
            } else {
                res.status(400).json({
                    error: "Auction not found or not in progress !",
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

exports.getLastBid = async (req, res, next) => {
    const prisma = new PrismaClient();

    try {
        try {
            let bid = await prisma.Bid.findFirst({
                where: {
                    auctionId: parseInt(req.params.id),
                },
                orderBy: {
                    price: "desc",
                },
            });

            res.status(200).json(bid);
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

exports.init = async (island) => {
    const prisma = new PrismaClient();

    let auction = await prisma.Auction.findUnique({
        where: {
            islandId: island.id,
        },
        include: {
            island: true,
        },
    });

    let splitStartDate = auction.startDate.split("-");
    let splitEndDate = auction.endDate.split("-");

    let startingDate = new Date(
        splitStartDate[0],
        splitStartDate[1] - 1,
        splitStartDate[2],
        0, //splitStartDate[3],
        0, //splitStartDate[4],
        0 //splitStartDate[5]
    );
    let endingDate = new Date(
        splitEndDate[0],
        splitEndDate[1] - 1,
        splitEndDate[2],
        0, //splitEndDate[3],
        0, //splitEndDate[4],
        0 //splitEndDate[5]
    );

    const jobStart = schedule.scheduleJob(startingDate, async () => {
        if (auction.status === "pending") {
            try {
                await prisma.Auction.update({
                    where: {
                        id: auction.id,
                    },
                    data: {
                        status: "started",
                    },
                });

                console.log(
                    "Auction " + island.name + " (" + auction.id + ") started !"
                );
            } catch (error) {
                console.log(error);
            }
        }
    });

    const jobEnd = schedule.scheduleJob(endingDate, async () => {
        try {
            let auction = await prisma.Auction.findUnique({
                where: {
                    islandId: island.id,
                },
                include: {
                    island: true,
                    initiator: true,
                },
            });

            let bid = await prisma.Bid.findFirst({
                where: {
                    auctionId: auction.id,
                },
                orderBy: {
                    price: "desc",
                },
            });

            if (auction.status === "started" && bid) {
                try {
                    await prisma.Auction.update({
                        where: {
                            id: auction.id,
                        },
                        data: {
                            status: "ended",
                        },
                    });

                    await prisma.Sale.create({
                        data: {
                            price: bid.price,
                            status: "pending",
                            island: {
                                connect: {
                                    id: auction.islandId,
                                },
                            },
                            buyer: {
                                connect: {
                                    id: bid.bidderId,
                                },
                            },
                            seller: {
                                connect: {
                                    id: auction.initiatorId,
                                },
                            },
                        },
                    });

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
                    await prisma.Auction.update({
                        where: {
                            id: auction.id,
                        },
                        data: {
                            status: "issued",
                        },
                    });

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
