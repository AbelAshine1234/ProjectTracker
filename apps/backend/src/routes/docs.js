import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import * as docController from '../controllers/doc.js';

const router = Router();

router.use(authenticate);

router.get('/project/:projectId', docController.getByProject);
router.post('/', docController.create);
router.put('/:id', docController.update);
router.delete('/:id', docController.remove);

export default router;
