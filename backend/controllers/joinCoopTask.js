import coopTask from '../models/coopTaskSchema.js';

export const joinCoopTask = async (req, res) => {
    try {
        const userId = req.user.id;
        const { coopTaskId } = req.params;

        const task = await coopTask.findById(coopTaskId);

        if(!task) {
            return res.status(404).json({ message: 'Cooperative task not found' });
        }

        if(task.users.includes(userId)) {
            return res.status(400).json({ message: 'You are already part of this cooperative task.' });
        }

        if(task.users.length >= task.countOfUsersRequired)  {
            return res.status(400).json({ message: 'This cooperative task is already full.' });
        }

        task.users.push(userId);
        await task.save();

        res.status(200).json({ message: 'Joined cooperative task successfully', coopTask: task });
    } catch (error) {
        console.error("Join Error:", error);
        res.status(500).json({ message: 'Error joining cooperative task', error: error.message });
    }
};