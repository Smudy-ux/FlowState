import express from 'express';
import { getTasks } from '../controllers/taskController.controller.js';

const router = express.Router();

router.get('/tasks', getTasks);

export default router;