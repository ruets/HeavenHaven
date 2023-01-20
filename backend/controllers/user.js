const { PrismaClient, prisma } = require("@prisma/client");
const e = require("express");
const { json } = require("express");
const bcrypt = require("bcrypt");

///////////////////////////////////////////////////////////
//                      User informations                //
///////////////////////////////////////////////////////////

/**
 * This function returns the profile informations of the authentified user
 * @param {} req    Request
 * @param {*} res   JSON response
 * @param {*} next  next callback
 */
exports.getProfileInformations = async (req, res, next) => {
    //We initialize our Prisma client
    const prisma = new PrismaClient();

    try {
        try {
            //We find the profile of the connected user from the token
            const connectedUser = await prisma.User.findUnique({
                where: {
                    //We searh for the current user
                    id: req.auth.id,
                },
                include: {
                    //We add the customer to the JSON object
                    customer: {
                        include: {
                            auctions: { include: { island: true } },
                            agents: true,
                        },
                    },
                    //We add the watchlist to the JOSN oject
                    watchlist: { include: { island: true } },
                    agent: true,
                },
            });

            //If the user is found, we can send it to the response
            if (connectedUser) {
                //We hide the password for ensure the password's safety
                connectedUser.password = undefined;
                //And we send the user to the response
                res.status(200).json(connectedUser);
            } else {
                //If the user is not found, we send an error
                res.status(400).json({ message: "User not found" });
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

/**
 * This function changes the password of the authentified user. The password is obviously encrypted.
 * @param {*} req   Request
 * @param {*} res   JSON response
 * @param {*} next  next callback
 * @returns         The reponse, whether the password has been changed or not
 */
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
                    //Id of the current user
                    id: req.auth.id,
                },
            });

            //We check that the user is found
            if (connectedUser) {
                //We check if the old password is correct, by comparing the hashes
                let valid = await bcrypt.compare(
                    oldPassword,
                    connectedUser.password
                );
                
                if (!valid) {
                    //If the specified old password is different from the password in the database, we send an error
                    return res
                        .status(401)
                        .json({ error: "Old password incorrect !" });
                } else {
                    //We check if the new password is correct
                    let hash = await bcrypt.hash(password1, 10);
                    let validNew = await bcrypt.compare(password2, hash);

                    if (!validNew) {
                        //If the new passwords hashes are different, we send an error
                        return res
                            .status(401)
                            .json({ error: "Passwords do not match !" });
                    } else {
                        //Then, we can update the password
                        const updatedUser = await prisma.User.update({
                            where: {
                                id: req.auth.id,
                            },
                            data: {
                                //We replace the password with the hash of the new password
                                password: hash,
                            },
                        });
                        //We notify in the response
                        res.status(200).json({ message: "Password updated !" });
                    }
                }
            } else {
                //If the user is not found
                res.status(400).json({ message: "User not found" });
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

///////////////////////////////////////////////////////////
//                       Islands                         //
///////////////////////////////////////////////////////////

/*
 * This part of the controller is dedicated to manage the islands linked to the authentified user.
 * An user has a watchlist, and also a list of the auctions initiated.
 */

/**
 * This function returns the islands that the authentified user has initiated.
 * @param {*} req   Request
 * @param {*} res   JSON response
 * @param {*} next  next callback
 */
exports.getIslands = async (req, res, next) => {
    //We initialize our Prisma client
    const prisma = new PrismaClient();

    try {
        try {
            //We find the profile of the connected user from the token
            const connectedUser = await prisma.User.findUnique({
                where: {
                    //The current user id
                    id: req.auth.id,
                },
                //We include the customer and its auctions in the JSON object
                include: {
                    customer: {
                        include: {
                            auctions: {
                                include: { island: true },
                            },
                        },
                    },
                    agent: true,
                },
            });

            if (connectedUser && connectedUser.customer) {
                //If the user is gotten, we get the islands
                const islands = connectedUser.customer.auctions.map(
                    (auction) => {
                        return auction.island;
                    }
                );
                //We return the list of islands
                res.status(200).json(islands);
            } else {
                //If the current user is not found we send an error
                res.status(400).json({ message: "User not found" });
            }
        } catch (error) {
            res.status(400).json({
                //We handle the errors
                error: "Intern error with error code 400 : " + error + error,
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
 * This function returns the listing of the islands. 
 * WARNING: this function is deprecated, insetad of it we use @{getIslands}
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @deprecated
 */
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
                include: {
                    customer: {
                        include: {
                            auctions: {
                                include: { island: true },
                            },
                        },
                    },
                    agent: true,
                },
            });

            if (connectedUser && connectedUser.customer) {
                //If the user is gotten, we get the islands
                const islands = connectedUser.customer.auctions.map(
                    (auction) => {
                        if (auction.status == "started") {
                            return auction.island;
                        }
                    }
                );
                //After, we send the list of the islands
                res.status(200).json(islands);
            } else {
                //If the user is not found, we send an error
                res.status(400).json({ message: "User not found" });
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

///////////////////////////////////////////////////////////
//                      Watchlist                        //
///////////////////////////////////////////////////////////

/*
 * This part focuses on the watchlist of the user. An user can like auctions.
 */

/**
 * This function returns the watchlist of the authenticated user.
 * @param {*} req   Request
 * @param {*} res   JSON response
 * @param {*} next  next callback
 */
exports.getWatchlist = async (req, res, next) => {
    //We initialize our Prisma client
    const prisma = new PrismaClient();
    //The watchlist is a list of auctions contained in an user. We need to get the connected user ID

    try {
        try {
            //We find the profile of the connected user from the token
            const connectedUser = await prisma.User.findUnique({
                where: {
                    //The current user id
                    id: req.auth.id,
                },
                //We include the watchlist in he JSON object
                include: { watchlist: { include: { island: true } } },
            });

            //We check that the user is found
            if (connectedUser) {
                //If the user is gotten, we get the watchlist
                res.status(200).json(connectedUser.watchlist);
            } else {
                //If the user is not found, we send an error
                res.status(400).json({ message: "User not found" });
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

/**
 * This function performs the adding of a new island to the watchlist of the authenticated user
 * @param {*} req   Request
 * @param {*} res   JSON response
 * @param {*} next  next callback
 */
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
                            id: req.body.auctionId,
                        },
                    },
                },
            });
            //We send a notification to the response
            res.status(200).json("Added to watchlist !");
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
 * This function removes an item from the watchlist of the authenticated user
 * @param {*} req   Request
 * @param {*} res   JSON response
 * @param {*} next  next callback
 */
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
            //We send a notification to the response
            res.status(200).json("Removed from watchlist !");
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

///////////////////////////////////////////////////////////
//                      Agents                           //
///////////////////////////////////////////////////////////


exports.signupAgent = async (req, res, next) => {
    const prisma = new PrismaClient();

    //Authentified user id
    const id = req.auth.id;

    //We need to hash the password and to compare to the confirmation password's hash
    const hash = bcrypt.hash(req.body.password1, 10);
    const valid = bcrypt.compare(req.body.password2, hash);

    if (!valid) {
        //If the hashes differs, we send an error
        res.status(400).json({ error: "Passwords do not match !" });
    }

    try {
        //Then, we try to create a new agent
        const createAgent = prisma.agent.create({
            data: {
                user: {
                    create: {
                        //We create a new user from the informations
                        email: req.body.email,
                        password: hash,
                        lastName: req.body.lastName,
                        firstName: req.body.firstName,
                        phone: req.body.phone,

                        address: req.body.address,
                        apt: req.body.apt,
                        city: req.body.city,
                        zip: req.body.zip,
                        country: req.body.country,
                        idCardLink: req.body.idCardLink,
                    },
                },
                customer: {
                    connect: {
                        //We connect the created agent to the connected user
                        idUser: id,
                    },
                },
            },
        });
        //We send a notification to the response
        res.status(200).json({ message: "Agent successfully registered" });
    } catch (error) {
        //We handle the errors
        res.status(501).json("An unexpected error occured");
    }
};

///////////////////////////////////////////////////////////
//                      Sponsoring                       //
///////////////////////////////////////////////////////////

exports.validateSponsoring = async (req, res, next) => {
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
                    customer: {
                        update: {
                            //We add the island specified in the watchlist into the watchlist
                            sponsored: true,
                        },
                    },
                },
            });
            //We send a notification to the response
            res.status(200).json("Sponsoring validated !");
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
