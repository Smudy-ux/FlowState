import Task from '../models/Task.js';

export const updateTask = async (req, res) => {
    try {
        const userId = req.user.id;
        const { taskId } = req.params;
        const { title, description, completed } = req.body;

        const task = await Task.findOne({ _id: taskId, user: userId });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        if (title !== undefined) task.title = title;
        if (description !== undefined) task.description = description;
        if (completed !== undefined) task.completed = completed;

        await task.save();

        res.status(200).json({ message: 'Task updated successfully', task });
    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ message: 'Error updating task', error: error.message });
    }
};