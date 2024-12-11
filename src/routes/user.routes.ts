import { Router } from 'express';
import {
  createUserHandler,
  getAllUsersHandler,
} from '../controllers/user.controller';
import { validate } from '../middlewares/validate';
import { userSchema } from '../utils/validationSchemas';

const router = Router();

router.post('/users', validate(userSchema), createUserHandler);
router.get('/users', getAllUsersHandler);

export default router;
