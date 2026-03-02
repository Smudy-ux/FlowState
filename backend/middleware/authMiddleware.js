import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(401).json({message: 'No token provided'});
    }

    const token = authHeader.split(' ')[1];

    if(!token) {
        return res.status(401).json({message: 'No token provided'});
    }

    try {
        const secretKey = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, secretKey);
        req.userId = (decoded).id;
        next();
    } catch (error) {
        res.status(401).json({message: 'Invalid token'});
    }
};