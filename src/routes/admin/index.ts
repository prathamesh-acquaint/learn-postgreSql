import express from 'express';
import industryRoutes from './industry.routes';
import interestRoutes from './interest.routes';

const adminRouter = express.Router();

adminRouter.use('/industry', industryRoutes);
adminRouter.use('/interest', interestRoutes);

export default adminRouter;
