const jwt = require("jsonwebtoken"); // Import jwt to verify tokens

const config = require("../config/config"); // Import config file

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]; // Get token from request header
        const decodedToken = jwt.verify(token, config.secretKey); // Decode token
        const id = decodedToken.id; // Extract user id from token
        // If the token is valid, add the user id to the request
        req.auth = {
            id: id,
        };
        // Call next middleware
        next();
    } catch (error) {
        // If the token is invalid, return an error
        res.status(401).json({ error });
    }
};
