import Task from '../models/personalTaskSchema.js';

export const createTask = async (req, res) => {
    try {
        const userId = req.user.id;
        const { title, description } = req.body;

        const newTask = new Task({
            title,
            description,
            user: userId
        });

        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};