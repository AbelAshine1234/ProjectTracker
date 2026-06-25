import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import * as commentController from '../controllers/comment.js';

const router = Router();

router.use(authenticate);

router.get('/:entityKey', commentController.getComments);
router.post('/:entityKey', commentController.addComment);
router.delete('/:id', commentController.deleteComment);

export default router;
