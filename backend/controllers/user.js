const { PrismaClient, prisma } = require("@prisma/client");
const e = require("express");
const { json } = require("express");
const bcrypt = require("bcrypt");

///////////////////////////////////////////////////////////
//                      User informations                //
///////////////////////////////////////////////////////////

/**
 * This functions returns the profile informations of the authentified user
 * @param {} req
 * @param {*} res
 * @param {*} next
 */
exports.getProfileInformations = async (req, res, next) => {
    //We initialize our Prisma client
    const prisma = new PrismaClient();
    
    try {
        try {
            //We find the profile of the connected user from the token
            const connectedUser = await prisma.User.findUnique({
                where: {
                    id: req.auth.id,
                },
            });
            if (connectedUser) {
                connectedUser.password = undefined;
                res.status(200).json(connectedUser);
            } else {
                res.status(400).json({ message: "User not found" });
            }
        } catch (error) {
            res.status(400).json({ error: "Intern error with error code 400 !" });
        }
    } catch (error) {
        res.status(500).json({ error: "Intern error with error code 500 !" });
    }
};

exports.changePassword = async (req, res, next) => {
    //We initialize our Prisma client
    const prisma = new PrismaClient();
    //We get the old password and new passwords from the request body
    const oldPassword = req.body.oldPassword;
    const password1 = req.body.newPassword1;
    const password2 = req.body.newPassword2;

    try {
        try {
            //We find the profile of the connected user from the token
            const connectedUser = await prisma.User.findUnique({
                where: {
                    id: req.auth.id,
                },
            });

            if (connectedUser) {
                //We check if the old password is correct
                let valid = await bcrypt.compare(oldPassword, connectedUser.password);
                if (!valid) {
                    return res.status(401).json({ error: "Old password incorrect !" });
                } else {
                    //We check if the new password is correct
                    let hash = await bcrypt.hash(password1, 10);
                    let validNew = await bcrypt.compare(password2, hash);

                    if (!validNew) {
                        return res.status(401).json({ error: "Passwords do not match !" });
                    } else {
                        //We update the password
                        const updatedUser = await prisma.User.update({
                            where: {
                                id: req.auth.id,
                            },
                            data: {
                                password: hash,
                            },
                        });
                        res.status(200).json({ message: "Password updated !" });
                    }
                }
            } else {
                res.status(400).json({ message: "User not found" });
            }
        } catch (error) {
            res.status(400).json({ error: "Intern error with error code 400 !" });
        }
    } catch (error) {
        res.status(500).json({ error: "Intern error with error code 500 !" });
    }
};

///////////////////////////////////////////////////////////
//                       Islands                         //
///////////////////////////////////////////////////////////
exports.getIslands = async (req, res, next) => {
    //We initialize our Prisma client
    const prisma = new PrismaClient();
    
    try {
        try {
            //We find the profile of the connected user from the token
            const connectedUser = await prisma.User.findUnique({
                where: {
                    id: req.auth.id,
                },
                include: { customer: {
                    include: { auctions: {
                        include: { island: true }}}},
                    agent: true,
                },
            });

            if (connectedUser && connectedUser.customer) {
                //If the user is gotten, we get the islands
                const islands = connectedUser.customer.auctions.map((auction) => {
                    return auction.island;
                });
                res.status(200).json(islands);
            } else {
                res.status(400).json({ message: "User not found" });
            }
        } catch (error) {
            res.status(400).json({ error: "Intern error with error code 400 !" + error });
        }
    } catch (error) {
        res.status(500).json({ error: "Intern error with error code 500 !" });
    }
};

exports.getListings = async (req, res, next) => {
    //We initialize our Prisma client
    const prisma = new PrismaClient();
    
    try {
        try {
            //We find the profile of the connected user from the token
            const connectedUser = await prisma.User.findUnique({
                where: {
                    id: req.auth.id,
                },
                include: { customer: {
                    include: { auctions: {
                        include: { island: true }}}},
                    agent: true,
                },
            });

            if (connectedUser && connectedUser.customer) {
                //If the user is gotten, we get the islands
                const islands = connectedUser.customer.auctions.map((auction) => {
                    if (auction.status == "started") {
                        return auction.island;
                    }
                });
                res.status(200).json(islands);
            } else {
                res.status(400).json({ message: "User not found" });
            }
        } catch (error) {
            res.status(400).json({ error: "Intern error with error code 400 !" + error });
        }
    } catch (error) {
        res.status(500).json({ error: "Intern error with error code 500 !" });
    }
};


///////////////////////////////////////////////////////////
//                      Watchlist                        //
///////////////////////////////////////////////////////////

//Normalement cette méthode est complète mais pas testée

exports.getWatchlist = async (req, res, next) => {
    //We initialize our Prisma client
    const prisma = new PrismaClient();
    //The watchlist is a list of auctions contained in an user. We need to get the connected user ID

    try {
        try {
            //We find the profile of the connected user from the token
            const connectedUser = await prisma.User.findUnique({
                where: {
                    id: req.auth.id,
                },
                include: { watchlist: true },
            });

            if (connectedUser) {
                //If the user is gotten, we get the watchlist
                res.status(200).json(connectedUser.watchlist);
            } else {
                res.status(400).json({ message: "User not found" });
            }
        } catch (error) {
            res.status(400).json({ error: "Intern error with error code 400 !" });
        }
    } catch (error) {
        res.status(500).json({ error: "Intern error with error code 500 !" });
    }
};

//Normalement cette méthode est complète mais pas testée
exports.addToWatchlist = async (req, res, next) => {
    //We initialize our Prisma client
    const prisma = new PrismaClient();
    //The watchlist is a list of auctions contained in an user. We need to get the connected user ID
    const id = req.auth.id;

    try {
        try {
            //We need to update the user by connecting a new entry to the watchlist
            const updateUser = await prisma.User.update({
                where: {
                    //We need the user corresponding to the connected user
                    id: id,
                },
                data: {
                    //We add a new entry in watchlist
                    watchlist: {
                        connect: {
                            //We add the island specified in the watchlist into the watchlist
                            id: req.body.islandId,
                        },
                    },
                },
            });
            res.status(200).json("Added to watchlist !");
        } catch (error) {
            res.status(400).json({ error: "Intern error with error code 400 !" });
        }
    } catch (error) {
        res.status(500).json({ error: "Intern error with error code 500 !" });
    }
};

//Pour l'instant pas fini
exports.removeFromWatchlist = async (req, res, next) => {
    //We initialize our Prisma client
    const prisma = new PrismaClient();
    const id = req.auth.id;

    try {
        try {
            //We need to update the user by connecting a new entry to the watchlist
            const updateUser = await prisma.User.update({
                where: {
                    //We need the user corresponding to the connected user
                    id: id,
                },
                data: {
                    //We add a new entry in watchlist
                    watchlist: {
                        disconnect: {
                            //We add the island specified in the watchlist into the watchlist
                            id: req.body.islandId,
                        },
                    },
                },
            });
            res.status(200).json("Removed from watchlist !");
        } catch (error) {
            res.status(400).json({ error: "Intern error with error code 400 !" });
        }
    } catch (error) {
        res.status(500).json({ error: "Intern error with error code 500 !" });
    }
};
