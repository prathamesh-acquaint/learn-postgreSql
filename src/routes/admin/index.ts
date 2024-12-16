import express from 'express';
import industryRoutes from './industry.routes';
import interestRoutes from './interest.routes';
import skillRoutes from './skill.routes';

const adminRouter = express.Router();

adminRouter.use('/industry', industryRoutes);
adminRouter.use('/interest', interestRoutes);
adminRouter.use('/skill', skillRoutes);

export default adminRouter;
