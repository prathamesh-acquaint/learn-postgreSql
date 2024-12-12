import express from 'express';
import { loginHandler, registerHandler } from '../controllers/auth.controller';
import { validate } from '../middlewares/validate';
import { loginSchema, registerSchema } from '../validators/auth';
import { validateRegister } from '../middlewares/registerMiddleware';

const router = express.Router();

router.post('/register', validateRegister(), registerHandler);
router.post('/login', validate(loginSchema), loginHandler);

export default router;
