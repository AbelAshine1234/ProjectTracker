import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import * as platformController from '../controllers/platform.js';

const router = Router();

router.use(authenticate);

router.get('/project/:projectId', platformController.getByProject);
router.get('/:id', platformController.getById);
router.post('/', platformController.create);
router.put('/:id', platformController.update);
router.delete('/:id', platformController.remove);

export default router;
