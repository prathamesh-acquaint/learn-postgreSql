import express from 'express';
import userRoutes from './routes/user.routes';
import { errorHandler } from './middlewares/errorHandler';
import authRoutes from "../src/routes/auth.routes"

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use('/api', userRoutes);
app.use("/api/auth", authRoutes);

// Error handler
app.use(errorHandler);

export default app;
