import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.model.js';

export const login = async (req, res) => {
    const {email, password} = req.body;

    try {
        const secretKey = process.env.JWT_SECRET;
        const user = await User.findOne({email});

        if (!user) {
            return res.status(400).json({message: 'Invalid email or password'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message: 'Invalid email or password'});
        }

        const token = jwt.sign({id: user._id}, secretKey, {expiresIn: '7d'});

        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        };

        res.cookie('token', token, cookieOptions);

        res.json({message: 'Login successful',
            user: {id: user._id, name: user.name, email: user.email}
        });

    } catch (error) {
        res.status(500).json({message: 'Server error'});
    }
}