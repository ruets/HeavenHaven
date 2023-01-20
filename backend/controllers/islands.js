const { PrismaClient } = require("@prisma/client");

const auctionCtrl = require("./auction");

/**
 * This function returns the trending islands.
 * The function returns 6 islands.
 *
 * @param {*} req   Request
 * @param {*} res   JSON response
 * @param {*} next  next callback
 */
exports.getTrends = async (req, res, next) => {
    const prisma = new PrismaClient();

    try {
        try {
            // Get 6 firsts islands ordered by the count of elements in auction's watchlisted attribute
            //The islands returned are the islanded that were liked the most
            let trendings = await prisma.Island.findMany({
                orderBy: {
                    auction: {
                        watchlisted: {
                            _count: "desc",
                        },
                    },
                },
                take: 6,
            });
            //Then we send the response
            res.status(200).json(trendings);
        } catch (error) {
            res.status(400).json({
                //We handle the errors
                error: "Intern error with error code 400 : " + error,
            });
        }
    } catch (error) {
        res.status(500).json({
            //We handle the errors
            error: "Intern error with error code 500 : " + error,
        });
    }
};

/**
 * This function returns all the islands.
 *
 * @param {} req    Request
 * @param {*} res   JSON response
 * @param {*} next  next callback
 */
exports.getAll = async (req, res, next) => {
    const prisma = new PrismaClient();

    try {
        try {

            //We perform a fincMany to get all the Islands
            let islands = await prisma.Island.findMany();
            //We send the list to the response
            res.status(200).json(islands);
        } catch (error) {
            res.status(400).json({
                //We handle the errors
                error: "Intern error with error code 400 : " + error,
            });
        }
    } catch (error) {
        res.status(500).json({
            //We handle the errors
            error: "Intern error with error code 500 : " + error,
        });
    }
};

/**
 * This function returns one island from its id. The id is contained in the request.
 * @param {} req    Request
 * @param {*} res   JSON response
 * @param {*} next  next callback
 */
exports.getOne = async (req, res, next) => {
    const prisma = new PrismaClient();
    try {
        try {
            //We get the island from the id
            let island = await prisma.Island.findUnique({
                where: {
                    //The id of the island to return
                    id: parseInt(req.params.id),
                },
                include: {
                    //We also add the related auction to the JSON object
                    auction: true,
                },
            });
            //We send the response
            res.status(200).json(island);
        } catch (error) {
            res.status(400).json({
                //We handle the errors
                error: "Intern error with error code 400 : " + error,
            });
        }
    } catch (error) {
        res.status(500).json({
            //We handle the errors
            error: "Intern error with error code 500 : " + error,
        });
    }
};

/**
 * This function returns all the islands with name matching a certain pattern.
 * @param {} req    Request
 * @param {*} res   JSON response
 * @param {*} next  next callback
 */
exports.getWithFilter = async (req, res, next) => {
    const prisma = new PrismaClient();

    try {
        try {
            //We get the list of all the islands matching
            let islands = await prisma.Island.findMany({
                where: {
                    //The name pattern is containd in the parameters of the request
                    name: { contains: req.params.pattern },
                },
            });
            //We send the list to the response
            res.status(200).json(islands);
        } catch (error) {
            res.status(400).json({
                //We handle the errors
                error: "Intern error with error code 400 : " + error,
            });
        }
    } catch (error) {
        res.status(500).json({
            //We handle the errors
            error: "Intern error with error code 500 : " + error,
        });
    }
};

/**
 * This function creates a new island and the associated auction.
 * This also contains all the features that permites to start the auction at a certain date
 * @param {} req    Request
 * @param {*} res   JSON response
 * @param {*} next  next callback
 */
exports.sell = async (req, res, next) => {
    const prisma = new PrismaClient();

    try {
        

        /**
         * To sell an island, we need some images for the description
         */

        //We get the images contained in the request and append it to an array
        let imgs = req.files.images;
        //We also initialize a new array, that will contain the URLs to the images
        let otherImgs = [];

        //If iages were appended well
        if (imgs) {
            //We iterate into the images
            imgs.forEach((img) => {
                //For each image, we append the links to the other array
                otherImgs.push(
                    //We treat the name of the file to make the path match the right folder to store the images
                    `${req.protocol}://${req.get(
                        "host"
                    )}/imgs/islands/${req.body.name.split(" ").join("_")}/${
                        img.filename
                    }`
                );
            });
        } else {
            //In the case where no images were uploaded, we return an error
            return res
                .status(400)
                .json({
                    error: "You must upload at least one image for the island !",
                });
        }

        //We must check that the start date is before the end date
        if (req.body.startDate > req.body.endDate) {
            //If it is the case, we also send an error
            return res
                .status(400)
                .json({ error: "Start date must be before end date !" });
        } else if (req.body.startDate === req.body.endDate) {               //We also check that the two dates does not correspond to the same day
            //If it is the case, we also send an error
            return res.status(400).json({
                error: "Start date must be different from end date !",
            });
        } else if (req.body.startDate <= Date.now()) {                      //We also check that the start date is not after today
            return res
                //If it is the case, we also send an error
                .status(400)
                .json({ error: "Start date must be after today's date !" });
        }

        try {
            //After all the constraints are verified, we can add the island to the daatbase
            let island = await prisma.Island.create({
                //We add all the data from the request
                data: {
                    name: req.body.name,
                    area: parseInt(req.body.area),
                    latitude: req.body.latitude,
                    longitude: req.body.longitude,
                    country: req.body.country,
                    continent: req.body.continent,

                    weather: req.body.weather,
                    weatherDesc: "Some Weather",

                    //We add the links to the images
                    weatherImg: `${req.protocol}://${req.get(
                        "host"
                    )}/imgs/islands/${req.body.name.split(" ").join("_")}/${
                        req.files.weatherImg[0].filename
                    }`,

                    wildlife: req.body.wildlife,

                    //We add the links to the images
                    wildlifeImg: `${req.protocol}://${req.get(
                        "host"
                    )}/imgs/islands/${req.body.name.split(" ").join("_")}/${
                        req.files.wildlifeImg[0].filename
                    }`,

                    activities: req.body.activities,

                    //We add the links to the images
                    activitiesImg: `${req.protocol}://${req.get(
                        "host"
                    )}/imgs/islands/${req.body.name.split(" ").join("_")}/${
                        req.files.activitiesImg[0].filename
                    }`,

                    location: req.body.location,

                    mainImg: otherImgs[0],
                    //We add the links to the images
                    document: `${req.protocol}://${req.get(
                        "host"
                    )}/imgs/islands/${req.body.name.split(" ").join("_")}/${
                        req.files.document[0].filename
                    }`,

                    //This contains the other images
                    images: otherImgs,

                    //We also create a related auction
                    auction: {
                        create: {
                            reservePrice: parseFloat(req.body.price),
                            startDate: req.body.startDate,
                            endDate: req.body.endDate,
                            status: "pending",

                            initiator: {
                                connect: {
                                    //We connect the auction to the current user
                                    id: req.auth.id,
                                },
                            },
                        },
                    },
                },
            });

            //After the island is created, we initialize the related auction
            auctionCtrl.init(island);
            //We also send a confirmation message
            res.status(201).json({ message: "Island created !" });
        } catch (error) {
            res.status(400).json({
                //We handle the errors
                error: "Intern error with error code 400 : " + error,
            });
        }
    } catch (error) {
        res.status(500).json({
            //We handle the errors
            error: "Intern error with error code 500 : " + error,
        });
    }
};

/**
 * This function removes an island from its id
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.deleteIsland = async (req, res, next) => {
    const prisma = new PrismaClient();
    try {
        try {

            //First, we get the island specified in the request
            let island = await prisma.Island.findUnique({
                where: {
                    //The id specified
                    id: parseInt(req.body.id),
                },
                include: {
                    //We add the related auction to the JSON object
                    auction: true,
                },
            });

            //We check that the island is found
            if (!island) {
                //If not found, we send an error
                return res.status(400).json({ error: "Island not found !" });
                //We also check that the current user is the initiator of the auction
            } else if (island.auction.initiatorId !== parseFloat(req.auth.id)) {
                //If it is not the case, we send an error
                return res
                    .status(400)
                    .json({ error: "You are not the initiator !" });
                //We can only remove an island for which the auction has not started yet
            } else if (island.auction.status !== "pending") {
                //If the auction has already started, we send an error
                return res
                    .status(400)
                    .json({ error: "You can't delete a started auction !" });
            } else {

                //If all the constraints are verified, we can perform the deleting of the auction
                //We delete the auction first, because the island depends on it
                await prisma.Auction.delete({
                    where: {
                        id: island.auction.id,
                    },
                });
                //Then we can delete the island
                await prisma.Island.delete({
                    where: {
                        id: parseInt(req.body.id),
                    },
                });
                //Finally, we send a notification in response
                res.status(200).json({ message: "Island deleted !" });
            }
        } catch (error) {
            res.status(400).json({
                //We handle the errors
                error: "Intern error with error code 400 : " + error,
            });
        }
    } catch (error) {
        res.status(500).json({
            //We handle the errors
            error: "Intern error with error code 500 : " + error,
        });
    }
};
