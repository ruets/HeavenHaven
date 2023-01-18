const jwt = require("jsonwebtoken");

const config = require("../config/config");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, config.secretKey);
        const id = decodedToken.id;
        req.auth = {
            id: id,
        };
        next();
    } catch (error) {
        res.status(401).json({ error });
    }
};
