import express from 'express';
import { createComments, getComments, likeComment, createReply, deleteComment} from '../controllers/commentControllers.js';
import {auth} from '../middleware/user/auth.js';

const router = express.Router();

router.post('/:id',[auth],createComments);
router.get('/:id', getComments);
router.patch('/:id',[auth],likeComment);
router.post('/reply/:id',[auth],createReply);
router.delete('/',[auth],deleteComment);

export default router;