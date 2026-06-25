import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import * as qaController from '../controllers/qa.js';

const router = Router();

router.use(authenticate);

router.get('/platform/:platformId', qaController.getByPlatform);
router.post('/', qaController.create);
router.put('/:id', qaController.update);
router.delete('/:id', qaController.remove);

export default router;
