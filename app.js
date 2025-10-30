import express from 'express';
import cors from 'cors';

import userRoutes from './src/routes/userRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import productRoutes from './src/routes/productRoutes.js';



const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });

app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/products', productRoutes);

export default app;
