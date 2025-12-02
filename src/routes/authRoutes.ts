import { Router } from 'express';
import { authenticateToken } from '../middleware/authenticateToken';
import { getUserProfile } from '../controllers/authController';
import { authorizeRole } from '../middleware/authorizeRole';
const router = Router();

router.get('/', authenticateToken, getUserProfile);
router.get('/authorize', authenticateToken, authorizeRole('ADMIN'), getUserProfile);

export { router as authRoutes };
