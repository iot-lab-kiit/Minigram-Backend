import express from 'express';
import {signup, signin, getUsers, updateUser, deleteUser} from '../controllers/userControllers.js';

const router = express.Router();

router.post('/signup',signup);
router.post('/signin',signin);
router.get('/',getUsers);
router.patch('/:id',updateUser);
router.delete('/:id',deleteUser);

export default router;