const { PrismaClient } = require("@prisma/client");

const config = require("../config/config");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.signup = async (req, res, next) => {
    const prisma = new PrismaClient();

    try {
        try {
            let hash = await bcrypt.hash(req.body.password, 10);

            await prisma.User.create({
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

                    idCardLink: `${req.protocol}://${req.get('host')}/imgs/${req.file.filename}`,
                    
                    customer : {
                        create: {
                            sponsorCode: sponsorCode(),

                            sponsor: {
                                connect: {
                                    sponsorCode: req.body.sponsorCode
                                }        
                            }
                        }
                    }
                }
            });

            res.status(201).json({ message: "Utilisateur créé !" });
        } catch (error) {
            console.log(error)
            res.status(400).json({ error });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.login = async (req, res, next) => {
    const prisma = new PrismaClient();

    try {
        try {
            let user = await prisma.User.findUnique({
                where: {
                    email: req.body.email,
                }
            })
        
            if (!user) {
                return res
                    .status(401)
                    .json({ error: "User or password incorrect !" });
            }
            
            let valid = await bcrypt.compare(req.body.password, user.password)
            
            if (!valid) {
                return res.status(401).json({ error: "User or password incorrect !" });
            }

            res.status(200).json({
                userId: user.id,
                token: jwt.sign({ userId: user.id }, config.secretKey, {
                    expiresIn: "24h",
                }),
            });
        
        } catch (error) {
            res.status(500).json({ error })
        }
    } catch (error) {
        res.status(500).json({ error })
    }
};


function sponsorCode() {
    return Math.floor((1 + Math.random()) * 0x1000000000000000)
        .toString(16)
        .substring(1);
}