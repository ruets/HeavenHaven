const { PrismaClient } = require("@prisma/client");

const config = require("../config/config");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * This function performs the signup of a new user. The user is saved into the database.
 * @param {*} req   Request
 * @param {*} res   JSON response
 * @param {*} next  next callback
 * @returns         The authentication token
 */
exports.signup = async (req, res, next) => {
    const prisma = new PrismaClient();

    try {
        
        //The signup requires a confirmation password, in order to check that the password enterd is correct
        //We hash the first password
        let hash = await bcrypt.hash(req.body.password1, 10);
        //We compare the password with the validation password
        let valid = await bcrypt.compare(req.body.password2, hash);

        if (!valid) {
            //If the validation password differs from the first password, we send an errors
            return res.status(400).json({ error: "Passwords do not match !" });
        }

        //After fhat, we need the sponsor code entered to be in the database
        //The sponsor code must also have a valid number of remaining uses 
        //We find the customer related to the sponsor code
        let sponsor = await prisma.Customer.findUnique({
            where: {
                sponsorCode: req.body.sponsorCode,
            },
        });

        if (!sponsor) {
             //If the sponsor code is not found, we send an error
            return res.status(400).json({ error: "Incorrect sponsor code !" });
        } else {
            if (sponsor.remainingUses <= 0) {
                return res.status(400).json({
                    //If the sponsor code's remaining use is 0, we also send an error
                    error: "Maximum number of uses of this sponsor code reached !",
                });
            }
        }
        //The signup requires a file corresponding to the Id card image
        let files = req.files;
        let filesReturned = [];

        if (!files) {
            //If the file is missing, we send an error
            return res.status(400).json({ error: "Missing id cards !" });
        } else {
            //We browse all the files and append it to the returned files
            files.forEach((file) => {
                filesReturned.push(
                    `${req.protocol}://${req.get("host")}/imgs/idCards/${
                        files[0].filename
                    }`
                );
            });
        }

        //Now that all the informations are verified, we try to create the user
        try {
            //We create the user using the informations contained into the request
            let customer = await prisma.User.create({
                data: {
                    email: req.body.email,
                    password: hash,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    phone: req.body.phone,

                    address: req.body.address,
                    apt: req.body.apt,
                    city: req.body.city,
                    zip: req.body.zip,
                    country: req.body.country,

                    idCardLink: filesReturned,

                    customer: {
                        create: {
                            sponsorCode: sponsorCode(),
                        },
                    },
                },
            });
            
            //The new user is sponsored, so we need to decrement the remaining uses of the sponsor code
            await prisma.Customer.update({
                where: {
                    id: sponsor.id,
                },
                data: {
                    remainingUses: sponsor.remainingUses - 1,
                },
            });

            //Once done, we send the response
            res.status(201).json({
                message: "Created customer !",
                id: customer.id,
                //We also create a token
                token: jwt.sign({ id: customer.id }, config.secretKey, {
                    expiresIn: "24h",
                }),
            });
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
 * Performs the loging in of an user
 * @param {*} req   Request
 * @param {*} res   JSON response
 * @param {*} next  next callback
 * @returns 
 */
exports.login = async (req, res, next) => {
    const prisma = new PrismaClient();

    //To log in an user, it needs to be into the database
    try {
        //We try to find the user
        let user = await prisma.User.findUnique({
            where: {
                email: req.body.email,
            },
        });

        if (!user) {
            //If the user is not found, we send an error
            return res
                .status(401)
                .json({ error: "Email or password incorrect !" });
        }
        //Then, we compare the hash of the password in the database and the hash of the password from the request
        let valid = await bcrypt.compare(req.body.password, user.password);

        if (!valid) {
            //If the passwords does not match, we send an error
            return res
                .status(401)
                .json({ error: "Email or password incorrect !" });
        }

        //All the informations are verified, so we can log the user in
        res.status(200).json({
            id: user.id,
            token: jwt.sign({ id: user.id }, config.secretKey, {
                expiresIn: "24h",
            }),
        });
    } catch (error) {
        res.status(500).json({
            error: "Intern error with error code 500 : " + error,
        });
    }
};

/**
 * Generate a random sponsor code
 * @returns     The sponsor code
 */
function sponsorCode() {
    const prisma = new PrismaClient();

    let sponsorCode = Math.floor((1 + Math.random()) * 0x1000000000000000)
        .toString(16)
        .substring(1);

    if (prisma.Customer.findUnique({ where: { sponsorCode: sponsorCode } })) {
        sponsorCode();
    } else {
        return sponsorCode;
    }
}
