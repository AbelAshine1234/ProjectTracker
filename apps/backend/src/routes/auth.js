import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import * as authController from '../controllers/auth.js';

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', authenticate, authController.me);
router.get('/users', authenticate, authController.getAllUsers);
router.post('/users', authenticate, authController.createUser);
router.put('/users/:id/status', authenticate, authController.toggleUserStatus);
router.delete('/users/:id', authenticate, authController.deleteUser);

export default router;
