const { PrismaClient } = require("@prisma/client");

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

exports.bid = async (req, res, next) => {
    const prisma = new PrismaClient();

    try {
        try {
            let auction = await prisma.Auction.findUnique({
                where: {
                    id: req.body.auctionId,
                },
            });

            if (auction) {
                let bid = await prisma.Bid.create({
                    data: {
                        price: req.body.price,
                        user: {
                            connect: {
                                id: req.body.userId,
                            },
                        },
                        auction: {
                            connect: {
                                id: req.body.auctionId,
                            },
                        },
                    },
                });

                res.status(200).json(bid);
            } else {
                res.status(400).json({ error: "Auction not found" });
            }
        } catch (error) {
            res.status(400).json({ error });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}