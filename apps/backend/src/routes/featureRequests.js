import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import * as featureRequestController from '../controllers/featureRequest.js';

const router = Router();

router.use(authenticate);

router.get('/platform/:platformId', featureRequestController.getByPlatform);
router.post('/', featureRequestController.create);
router.put('/:id', featureRequestController.update);
router.delete('/:id', featureRequestController.remove);

export default router;
