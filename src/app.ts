import express from 'express';
import userRoutes from './routes/user.routes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use('/api', userRoutes);

// Error handler
app.use(errorHandler);

export default app;
