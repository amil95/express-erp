import express from 'express';
import { getAllUsers } from '../controllers/userController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', authenticate, getAllUsers);

export default router;
