import { Router } from 'express';
import { login, register, authenticateToken } from '../controllers/auth.js';

const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/authenticate', authenticateToken);

export default authRouter;
