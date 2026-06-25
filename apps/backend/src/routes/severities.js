import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import * as severityController from '../controllers/severity.js';

const router = Router();

router.use(authenticate);

router.get('/project/:projectId', severityController.getByProject);
router.post('/', severityController.create);
router.put('/:id', severityController.update);
router.delete('/:id', severityController.remove);

export default router;
