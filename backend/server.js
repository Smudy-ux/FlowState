import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express';
import taskRoutes from './routes/taskRoutes.route.js';
import cookieParser from 'cookie-parser';
dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URI, {
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
})

app.use(express.json());
app.use(cookieParser());


app.use('/api', taskRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});