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
                                        
            res.status(200).json(trendings);
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
            let islands = await prisma.Island.findMany();

            res.status(200).json(islands);
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
 * This function returns one island from its id. The id is contained in the request.
 * @param {} req    Request
 * @param {*} res   JSON response
 * @param {*} next  next callback
 */
exports.getOne = async (req, res, next) => {
    const prisma = new PrismaClient();
    try {
        try {
            let island = await prisma.Island.findUnique({
                where: {
                    id: parseInt(req.params.id),
                },
                include: {
                    auction: true,
                },
            });

            res.status(200).json(island);
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
 * This function returns all the islands matching a certain pattern. The pattern concerns the name of the island.
 * @param {} req    Request
 * @param {*} res   JSON response
 * @param {*} next  next callback
 */
exports.getWithFilter = async (req, res, next) => {
    const prisma = new PrismaClient();
    try {
        try {
            let islands = await prisma.Island.findMany({
                where: {
                    name: { contains: req.params.pattern },
                },
            });

            res.status(200).json(islands);
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
 * This function creates a new island and the associated auction.
 * This also contains all the features that permites to start the auction at a certain date
 * @param {} req    Request
 * @param {*} res   JSON response
 * @param {*} next  next callback
 */
exports.sell = async (req, res, next) => {
    const prisma = new PrismaClient();

    try {
        // add all images to images json object
        let imgs = req.files.images;
        let otherImgs = [];

        if (imgs) {
            imgs.forEach((img) => {
                otherImgs.push(
                    `${req.protocol}://${req.get(
                        "host"
                    )}/imgs/islands/${req.body.name.split(" ").join("_")}/${
                        img.filename
                    }`
                );
            });
        }

        if (req.body.startDate > req.body.endDate) {
            return res
                .status(400)
                .json({ error: "Start date must be before end date !" });
        } else if (req.body.startDate === req.body.endDate) {
            return res.status(400).json({
                error: "Start date must be different from end date !",
            });
        } else if (req.body.startDate <= Date.now()) {
            return res
                .status(400)
                .json({ error: "Start date must be after today's date !" });
        }

        try {
            let island = await prisma.Island.create({
                data: {
                    name: req.body.name,
                    area: parseInt(req.body.area),
                    latitude: req.body.latitude,
                    longitude: req.body.longitude,
                    country: req.body.country,
                    continent: req.body.continent,

                    weather: req.body.weather,
                    weatherDesc: "Some Weather",
                    weatherImg: `${req.protocol}://${req.get(
                        "host"
                    )}/imgs/islands/${req.body.name.split(" ").join("_")}/${
                        req.files.weatherImg[0].filename
                    }`,

                    wildlife: req.body.wildlife,
                    wildlifeImg: `${req.protocol}://${req.get(
                        "host"
                    )}/imgs/islands/${req.body.name.split(" ").join("_")}/${
                        req.files.wildlifeImg[0].filename
                    }`,

                    activities: req.body.activities,
                    activitiesImg: `${req.protocol}://${req.get(
                        "host"
                    )}/imgs/islands/${req.body.name.split(" ").join("_")}/${
                        req.files.activitiesImg[0].filename
                    }`,

                    location: req.body.location,

                    mainImg: otherImgs[0],
                    document: `${req.protocol}://${req.get(
                        "host"
                    )}/imgs/islands/${req.body.name.split(" ").join("_")}/${
                        req.files.document[0].filename
                    }`,
                    images: otherImgs,

                    auction: {
                        create: {
                            reservePrice: parseFloat(req.body.price),
                            startDate: req.body.startDate,
                            endDate: req.body.endDate,
                            status: "pending",

                            initiator: {
                                connect: {
                                    id: parseFloat("0"),
                                },
                            },
                        },
                    },
                },
            });

            auctionCtrl.init(island);

            res.status(201).json({ message: "Island created !" });
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
