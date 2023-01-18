const { PrismaClient } = require("@prisma/client");

const config = require("../config/config");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.signup = async (req, res, next) => {
    const prisma = new PrismaClient();

    try {
        let hash = await bcrypt.hash(req.body.password1, 10);

        let valid = await bcrypt.compare(req.body.password2, hash);

        if (!valid) {
            return res.status(400).json({ error: "Passwords do not match !" });
        }

        let sponsor = await prisma.Customer.findUnique({
            where: {
                sponsorCode: req.body.sponsorCode,
            },
        });

        if (!sponsor) {
            return res.status(400).json({ error: "Incorrect sponsor code !" });
        } else {
            if (sponsor.remainingUses <= 0) {
                return res.status(400).json({
                    error: "Maximum number of uses of this sponsor code reached !",
                });
            }
        }

        let files = req.files;
        let filesReturned = [];

        if (!files) {
            return res.status(400).json({ error: "Missing id cards !" });
        } else {
            files.forEach((file) => {
                filesReturned.push(
                    `${req.protocol}://${req.get("host")}/imgs/idCards/${
                        files[0].filename
                    }`
                );
            });
        }

        try {
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

            await prisma.Customer.update({
                where: {
                    id: sponsor.id,
                },
                data: {
                    remainingUses: sponsor.remainingUses - 1,
                },
            });

            res.status(201).json({
                message: "Created customer !",
                id: customer.id,
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

exports.login = async (req, res, next) => {
    const prisma = new PrismaClient();

    try {
        let user = await prisma.User.findUnique({
            where: {
                email: req.body.email,
            },
        });

        if (!user) {
            return res
                .status(401)
                .json({ error: "Email or password incorrect !" });
        }

        let valid = await bcrypt.compare(req.body.password, user.password);

        if (!valid) {
            return res
                .status(401)
                .json({ error: "Email or password incorrect !" });
        }

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

function sponsorCode() {
    return Math.floor((1 + Math.random()) * 0x1000000000000000)
        .toString(16)
        .substring(1);
}
