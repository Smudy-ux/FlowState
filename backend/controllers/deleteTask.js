import personalTaskSchema from "../models/personalTaskSchema.js";

export const delteTask = async (req, res) => {
    try {
        const userId = req.user.id;
        const { taskId } = req.params;

        const task = await Task.findOneAndDelete({ _id: taskId, user: userId });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error("Delete Error:", error);
        res.status(500).json({ message: 'Error deleting task', error: error.message });
    }
};