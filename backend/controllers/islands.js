const { PrismaClient } = require("@prisma/client");

exports.getTrends = async (req, res, next) => {
    const prisma = new PrismaClient();

    try {
        try {
            let trendings = await prisma.Island.findMany();

            // select 6 random islands
            let randomIslands = [];
            trendings.forEach((island) => {
                if (randomIslands.length < 6) {
                    randomIslands.push(island);
                }
            });

            res.status(200).json(randomIslands);
        } catch (error) {
            res.status(400).json({ error });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.getAll = async (req, res, next) => {
    const prisma = new PrismaClient();

    try {
        try {
            let islands = await prisma.Island.findMany();

            res.status(200).json(islands);
        } catch (error) {
            res.status(400).json({ error });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.getOne = async (req, res, next) => {
    const prisma = new PrismaClient();

    try {
        try {
            let island = await prisma.Island.findUnique({
                where: {
                    id: req.params.id,
                },
            });

            res.status(200).json(island);
        } catch (error) {
            res.status(400).json({ error });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.sell = async (req, res, next) => {
    const prisma = new PrismaClient();

    // add all pics to pics json object
    let bodyPics = [];

    if (req.files.pics) {
        req.files.pics.forEach((pic) => {
            bodyPics.push({
                url: `${req.protocol}://${req.get('host')}/imgs/islands/${pic.filename}`,
            });
        });
    }

    try {
        try {
            await prisma.Island.create({
                data: {
                    name: req.body.name,
                    area: req.body.area,
                    latitude: req.body.latitude,
                    longitude: req.body.longitude,
                    country: req.body.country,

                    climate: req.body.weather,
                    climateImg: `${req.protocol}://${req.get('host')}/imgs/islands/${req.files.weather[0].filename}`,

                    wildlife: req.body.wildlife,
                    wildlifeImg: `${req.protocol}://${req.get('host')}/imgs/islands/${req.files.wildlife[0].filename}`,

                    activities: req.body.activities,
                    activitiesImg: `${req.protocol}://${req.get('host')}/imgs/islands/${req.files.activities[0].filename}`,

                    location: req.body.location,

                    images: {
                        create: bodyPics,
                    }
                }
            });
        } catch (error) {
            res.status(400).json({ error });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};