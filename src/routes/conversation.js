import express from 'express';
import {createConversation, getConversation, deleteConversation} from '../controllers/conversationControllers.js';

const router = express.Router();

router.post('/', createConversation);
router.get('/:id',getConversation);
router.delete('/:id',deleteConversation);

export default router;