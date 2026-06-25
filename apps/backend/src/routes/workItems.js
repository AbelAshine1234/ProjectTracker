import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import * as workItemController from '../controllers/workItem.js';

const router = Router();

router.use(authenticate);

router.get('/platform/:platformId', workItemController.getByPlatform);
router.post('/', workItemController.create);
router.put('/:id', workItemController.update);
router.delete('/:id', workItemController.remove);

export default router;
