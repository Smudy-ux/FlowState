import Task from '../models/personalTaskSchema.js';
import CoopTask from '../models/coopTaskSchema.js'; 

export const getTasks = async (req, res) => {
    try {
        const userId = req.user.id;

        const personalTasks = await Task.find({ user: userId });

        const coopTasks = await CoopTask.find({ users: userId });

        res.status(200).json({ personalTasks, coopTasks });
    } catch (error) {
        console.error("Fetch Error:", error);
        res.status(500).json({ message: 'Error fetching tasks', error: error.message });
    }
};