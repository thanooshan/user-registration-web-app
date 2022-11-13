import { loginUser } from '../controllers/userController.js';
import express from 'express';

const router = express.Router();

//login
router.post('/', loginUser);

export default router;
