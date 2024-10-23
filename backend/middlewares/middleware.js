import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import { JWT_SECRET } from '../config/config.js';

function authMiddleware(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer")) {
            res.status(403).send({ message: "Invalid AuthHeader." });
        }

        const token = authHeader.split('')[1];

        try {

            const decoded = jwt.verify(token, JWT_SECRET);
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