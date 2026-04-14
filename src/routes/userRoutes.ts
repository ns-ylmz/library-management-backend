import { Router } from 'express';

import { userController } from '@/controllers/userController';
import { borrowController } from '@/controllers/borrowController';
import { validate } from '@/middlewares/validation';
import {
	createUserBodySchema,
	userIdParamsSchema,
} from '@/validators/userValidator';
import {
	borrowBookParamsSchema,
	returnBookBodySchema,
} from '@/validators/borrowValidator';

const { getUsers, getUserById, createUser } = userController;
const { borrowBook, returnBook } = borrowController;

const router = Router();

router.get('/', getUsers);
router.get('/:id', validate(userIdParamsSchema, 'params'), getUserById);
router.post('/', validate(createUserBodySchema, 'body'), createUser);

router.post(
	'/:userId/borrow/:bookId',
	validate(borrowBookParamsSchema, 'params'),
	borrowBook,
);
router.post(
	'/:userId/return/:bookId',
	validate(borrowBookParamsSchema, 'params'),
	validate(returnBookBodySchema, 'body'),
	returnBook,
);

export default router;
