import { Router } from 'express';
import { login, register, me } from '../controllers/userControllers.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/register', register);
router.post('/login',    login);
router.get('/me',        protect, me);

export default router;
