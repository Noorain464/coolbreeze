import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import authRoutes from './routes/authRoutes.js';
import riderRoutes from './routes/riderRoutes.js';

import cors from 'cors';


dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
}));

connectDB();

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/riders', riderRoutes);

app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port', process.env.PORT);
});

export default app;