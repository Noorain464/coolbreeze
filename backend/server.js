import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import authRoutes from './routes/authRoutes.js';
import riderRoutes from './routes/riderRoutes.js';
import authRoutes from './routes/authRoutes.js';



dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/riders', riderRoutes);

app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port', process.env.PORT);
});

export default app;