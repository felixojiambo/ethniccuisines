import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import { authRouter } from './auth/auth.routes';
import { restaurantRouter } from './restaurants/restaurant.routes';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
dotenv.config();

const app = express();

// Middleware
app.use(helmet());
app.use(express.json());
app.use(limiter);
// Routes
app.use('/api/auth', authRouter);
app.use('/api/restaurants', restaurantRouter);

// Database Connection
mongoose.connect(process.env.MONGO_URI || '', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});
// Rate Limiting Middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100,
  });
export default app;
