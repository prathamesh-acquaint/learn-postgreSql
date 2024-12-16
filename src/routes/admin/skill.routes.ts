import express from 'express';
import { roleMiddleWare } from '../../middlewares/roleMiddleware';
import { validate } from '../../middlewares/validate';
import { skillSchema } from '../../validators/admin/skill.schema';
import {
  createSkillHandler,
  deleteSkillHandler,
  getAllSkillsHandler,
  updateSkillHandler,
} from '../../controllers/admin/skill.controller';

const router = express.Router();

router.get('/', roleMiddleWare(['ADMIN']), getAllSkillsHandler);

router.post(
  '/',
  roleMiddleWare(['ADMIN']),
  validate(skillSchema),
  createSkillHandler,
);

router.put(
  '/:id',
  roleMiddleWare(['ADMIN']),
  validate(skillSchema),
  updateSkillHandler,
);

router.delete('/:id', roleMiddleWare(['ADMIN']), deleteSkillHandler);

export default router;
