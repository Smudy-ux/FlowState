import Task from '../models/Task.model.js';

export const getTasks = async (req: Request, res: Response) => {
    try{
        const userId = req.user.id;
        const tasks = await Task.find({user: userId});
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error });
    }
};