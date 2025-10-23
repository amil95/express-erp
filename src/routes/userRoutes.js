import express from 'express';
import { getAllUsers, registerUser } from '../controllers/userController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', authenticate, getAllUsers);

router.post('/register', registerUser);

export default router;
