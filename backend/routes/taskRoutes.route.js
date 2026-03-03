 import express from 'express';
import { getTasks } from '../controllers/taskController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { register } from '../controllers/register.controller.js';
import { login } from '../controllers/login.controller.js';
import { createTask } from '../controllers/createTask.js';
import { createCoopTask } from '../controllers/createCoopTask.js';
import { joinCoopTask } from '../controllers/joinCoopTask.js';
import { updateTask } from '../controllers/updateTask.js';
import { delteTask } from '../controllers/deleteTask.js';

const router = express.Router();

router.get('/tasks', authMiddleware, getTasks);
router.post('/tasks', authMiddleware, createTask);
router.put('/tasks/:taskId', authMiddleware, updateTask);
router.delete('/tasks/:taskId', authMiddleware, delteTask);
router.post('/coop-tasks', authMiddleware, createCoopTask);
router.post('/coop-tasks/:coopTaskId/join', authMiddleware, joinCoopTask);
router.post('/register', register);
router.post('/login', login);
router.post('/logout', authMiddleware, logout);

export default router;