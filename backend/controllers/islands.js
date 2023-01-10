const { PrismaClient } = require("@prisma/client");

exports.getTrends = async (req, res, next) => {
    const prisma = new PrismaClient();

    try {
        try {
            let trendings = await prisma.Island.findMany();

            // select 6 random islands
            let randomIslands = [];
            for (let i = 0; i < 6; i++) {
                let randomIndex = Math.floor(Math.random() * trendings.length);
                randomIslands.push(trendings[randomIndex]);
                trendings.splice(randomIndex, 1);

                // if there are less than 6 auctions, break the loop
                if (trendings.length < 6) {
                    break;
                }
            }

            res.status(200).json(trendings);
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