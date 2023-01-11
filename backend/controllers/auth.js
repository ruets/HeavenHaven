const { PrismaClient } = require("@prisma/client");

const config = require("../config/config");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.signup = async (req, res, next) => {
    const prisma = new PrismaClient();

    try {
        let hash = await bcrypt.hash(req.body.password1, 10);

        let valid = await bcrypt.compare(req.body.password1, req.body.password2)

        if (!valid) {
            return res.status(400).json({ error: "Passwords do not match !" });
        }

        let sponsor = await prisma.Customer.findUnique({
            where: {
                sponsorCode: req.body.sponsorCode
            }
        })

        if (!sponsor) {
            return res.status(400).json({ error: "Incorrect sponsor code !" });
        } else {
            let sponsorings = await prisma.Customer.findMany({
                where: {
                    sponsorId: sponsor.idUser
                }
            })

            if (sponsorings.length >= 2) {
                return res.status(400).json({ error: "Maximum number of uses of this sponsor code reached !" });
            }
        }

        try {
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
    
                    idCardLink: `${req.protocol}://${req.get('host')}/imgs/idCards/${req.file.filename}`,
                    
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
            
            res.status(201).json({ message: "Created customer !" });
        } catch (error) {
            res.status(400).json({ error });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.login = async (req, res, next) => {
    const prisma = new PrismaClient();

    try {
        let user = await prisma.User.findUnique({
            where: {
                email: req.body.email,
            }
        })
    
        if (!user) {
            return res.status(401).json({ error: "Email or password incorrect !" });
        }
        
        let valid = await bcrypt.compare(req.body.password, user.password)
        
        if (!valid) {
            return res.status(401).json({ error: "Email or password incorrect !" });
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
};

function sponsorCode() {
    return Math.floor((1 + Math.random()) * 0x1000000000000000)
        .toString(16)
        .substring(1);
}