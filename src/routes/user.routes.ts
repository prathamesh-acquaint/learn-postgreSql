import { Router } from 'express';
import { getAllUsersHandler } from '../controllers/user.controller';

const router = Router();

router.get('/users', getAllUsersHandler);

export default router;
