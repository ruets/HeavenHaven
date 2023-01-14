const { PrismaClient } = require("@prisma/client");

const config = require("../config/config");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.signup = async (req, res, next) => {
    const prisma = new PrismaClient();

    try {
        let hash = await bcrypt.hash(req.body.password1, 10);

        let valid = await bcrypt.compare(req.body.password2, hash)

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
            if (sponsor.remainingUses <= 0) {
                return res.status(400).json({ error: "Maximum number of uses of this sponsor code reached !" });
            }
        }

        let files = req.files;
        let file1, file2;

        if (!files) {
            return res.status(400).json({ error: "Missing id cards !" });
        } else if (files.length === 1) {
            file1 = `${req.protocol}://${req.get('host')}/imgs/idCards/${files[0].filename}`;
            file2 = null;
        } else if (files.length === 2) {
            file1 = `${req.protocol}://${req.get('host')}/imgs/idCards/${files[0].filename}`;
            file2 = `${req.protocol}://${req.get('host')}/imgs/idCards/${files[1].filename}`;
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
    
                    idCardLink1: file1,
                    idCardLink2: file2,
                    
                    customer : {
                        create: {
                            sponsorCode: sponsorCode(),
                        }
                    }
                }
            });

            await prisma.Customer.update({
                where: {
                    idUser: sponsor.idUser
                },
                data: {
                    remainingUses: sponsor.remainingUses - 1
                }
            })
            
            res.status(201).json({
                message: "Created customer !",
                userId: customer.id,
                token: jwt.sign({ userId: customer.id }, config.secretKey, {
                    expiresIn: "24h",
                })
            });
        } catch (error) {
            res.status(400).json({ error: "Intern error with error code 400 !" });
        }
    } catch (error) {
        res.status(500).json({ error: "Intern error with error code 500 !" });
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
        res.status(500).json({ error: "Intern error with error code 500 !" });
    }
};

function sponsorCode() {
    return Math.floor((1 + Math.random()) * 0x1000000000000000)
        .toString(16)
        .substring(1);
}