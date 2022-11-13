import {
	getUsers,
	createUser,
	updateUser,
	deleteUser,
	getUser,
	loginUser,
} from '../controllers/userController.js';
import { requireAuth } from '../middleware/requireAuth.js';
import express from 'express';

const router = express.Router();
//require auth for all users routes

router.use(requireAuth);

//return all users
router.get('/', getUsers);

//create new user
router.post('/', createUser);

//update a user
router.put('/:id', updateUser);

//delete a user
router.delete('/:id', deleteUser);

//get a single user
router.get('/:id', getUser);

export default router;
