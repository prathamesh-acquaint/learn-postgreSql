import express from 'express';
import { roleMiddleWare } from '../../middlewares/roleMiddleware';
import { Role } from '../../constant/index.constant';
import { validate } from '../../middlewares/validate';
import { interestSchema } from '../../validators/admin/interest.schema';
import {
  createInterestHandler,
  deleteInterestHandler,
  getAllInterestHandler,
  updateInterestHandler,
} from '../../controllers/admin/interest.controller';

const interestRouter = express.Router();

interestRouter.get('/', roleMiddleWare([Role.ADMIN]), getAllInterestHandler);

interestRouter.post(
  '/',
  roleMiddleWare([Role.ADMIN]),
  validate(interestSchema),
  createInterestHandler,
);

interestRouter.put(
  '/:id',
  roleMiddleWare([Role.ADMIN]),
  validate(interestSchema),
  updateInterestHandler,
);

interestRouter.delete(
  '/:id',
  roleMiddleWare([Role.ADMIN]),
  deleteInterestHandler,
);

export default interestRouter;
