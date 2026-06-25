import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import * as subtaskController from '../controllers/subtask.js';

const router = Router();

router.use(authenticate);

router.get('/feature/:featureId', subtaskController.getByFeature);
router.post('/', subtaskController.create);
router.put('/:id', subtaskController.update);
router.delete('/:id', subtaskController.remove);

export default router;
