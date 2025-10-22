import express from 'express';
import cors from 'cors';
import userRoutes from './src/routes/userRoutes.js';
import { testConnection } from './src/config/db.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);

export default app;
