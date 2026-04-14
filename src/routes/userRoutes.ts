import { Router } from 'express';

import { userController } from '@/controllers/userController';
import { borrowController } from '@/controllers/borrowController';

const router = Router();

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);

router.post('/:userId/borrow/:bookId', borrowController.borrowBook);
router.post('/:userId/return/:bookId', borrowController.returnBook);

export default router;
