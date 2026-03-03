 import express from 'express';
import { getTasks } from '../controllers/taskController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { register } from '../controllers/register.controller.js';
import { login } from '../controllers/login.controller.js';
import { createTask } from '../controllers/createTask.js';
import { createCoopTask } from '../controllers/createCoopTask.js';

const router = express.Router();

router.get('/tasks', authMiddleware, getTasks);
router.post('/tasks', authMiddleware, createTask);
router.post('/coop-tasks', authMiddleware, createCoopTask);
router.post('/register', register);
router.post('/login', login);


export default router;