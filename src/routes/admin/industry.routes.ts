import express from 'express';
import { roleMiddleWare } from '../../middlewares/roleMiddleware';
import { validate } from '../../middlewares/validate';
import { industrySchema } from '../../validators/admin/industry.schema';
import {
  createIndustryHandler,
  deleteIndustryHandler,
  getAllIndustryHandler,
  updateIndustryHandler,
} from '../../controllers/admin/industry.controller';

const router = express.Router();

router.get('/', roleMiddleWare(['ADMIN']), getAllIndustryHandler);

router.post(
  '/',
  roleMiddleWare(['ADMIN']),
  validate(industrySchema),
  createIndustryHandler,
);

router.put(
  '/:id',
  roleMiddleWare(['ADMIN']),
  validate(industrySchema),
  updateIndustryHandler,
);

router.delete('/:id', roleMiddleWare(['ADMIN']), deleteIndustryHandler);

export default router;
