import CoopTask from '../models/coopTaskSchema.js';


export const createCoopTask = async (req, res) => {

    try {
        const userId = req.user.id;
        
        const  existingTask = await CoopTask.findOne({'users.0': userId});

        if (existingTask) {
            return res.status(400).json({ message: 'You have already created a cooperative task! Limit is 1 per user.' });
        }

        const { title, description, countOfUsersRequired } = req.body;

        const newCoopTask = new CoopTask({
            title,
            description,
            countOfUsersRequired,
            users: [userId]
        });

        await newCoopTask.save();

        res.status(201).json({ message: 'Cooperative task created successfully', coopTask: newCoopTask });
    } catch (error) {
        console.error("Creation Error:", error);
        res.status(400).json({ message: 'Error creating cooperative task', error: error.message });
    }
};