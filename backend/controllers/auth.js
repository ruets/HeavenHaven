const { PrismaClient } = require('@prisma/client');

const config = require('../config/config');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    const prisma = new PrismaClient();
    
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        prisma.user.create({
            data: {
                email: req.body.email,
                password: hash,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phone: req.body.phone
            }
        })
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

  exports.login = (req, res, next) => {
    const prisma = new PrismaClient();

    prisma.user.findUnique({
        where: {
            email: req.body.email
        }})
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'User or password incorrect !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'User or password incorrect !' });
                    }
                    res.status(200).json({
                        userId: user.id,
                        token: jwt.sign(
                            { userId: user.id },
                            config.secretKey,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
 };