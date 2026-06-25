import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import * as statusController from '../controllers/status.js';

const router = Router();

router.use(authenticate);

router.get('/project/:projectId', statusController.getByProject);
router.post('/', statusController.create);
router.put('/:id', statusController.update);
router.delete('/:id', statusController.remove);

export default router;
