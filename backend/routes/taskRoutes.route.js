import express from 'express';
import { getTasks } from '../controllers/taskController.controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { register } from '../controllers/register.controller.js';
import { login } from '../controllers/login.controller.js';
const router = express.Router();

router.get('/tasks', authMiddleware, getTasks);
router.post('/register', register);
router.post('/login', login);

export default router;