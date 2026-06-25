import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import * as bugController from '../controllers/bug.js';

const router = Router();

router.use(authenticate);

router.get('/platform/:platformId', bugController.getByPlatform);
router.get('/project/:projectId', bugController.getByProject);
router.post('/', bugController.create);
router.put('/:id', bugController.update);
router.delete('/:id', bugController.remove);

export default router;
