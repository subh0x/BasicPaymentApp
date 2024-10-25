const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

async function authMiddleware(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        // console.log(authHeader);
        if (!authHeader || !authHeader.startsWith("Bearer")) {
            res.status(403).send({ message: "Invalid AuthHeader." });
        }

        const token = authHeader.split(' ')[1];

        try {
            const decoded = await jwt.verify(token, JWT_SECRET);
            req.userId = decoded.userId;
        }
        catch (err) {
            return res.status(401).send({ message: err.message });
        }
        next();
    }
    catch (err) {
        return res.send({ message: err.message });
    }
}

module.exports = authMiddleware;