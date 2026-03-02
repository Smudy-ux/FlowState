import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.model.js';


export const register = async (req, res) => {
    const {name,email, password} = req.body;

    try {
        const secretKey = process.env.JWT_SECRET;
        const existingUser = await User.findOne({email});

        if (existingUser) {
            return res.status(400).json({message: 'Email already in use'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({name, email, password: hashedPassword});
        await newUser.save();

        const token = jwt.sign({id: newUser._id}, secretKey, {expiresIn: '7d'});
        
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        };

        res.cookie('token', token, cookieOptions);
        res.status(201).json({  message: 'User registered successfully', 
            user:{id: newUser._id, name: newUser.name, email: newUser.email  }
        });
    } catch (error) {
        res.status(500).json({message: 'Server error'});
    }
};