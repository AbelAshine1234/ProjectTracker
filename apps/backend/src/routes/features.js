import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import * as featureController from '../controllers/feature.js';

const router = Router();

router.use(authenticate);

router.get('/platform/:platformId', featureController.getByPlatform);
router.post('/', featureController.create);
router.put('/:id', featureController.update);
router.delete('/:id', featureController.remove);

export default router;
