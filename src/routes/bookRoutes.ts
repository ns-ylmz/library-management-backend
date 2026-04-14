import { Router } from 'express';

import { bookController } from '@/controllers/bookController';
import { validate } from '@/middlewares/validation';
import {
	bookIdParamsSchema,
	createBookBodySchema,
} from '@/validators/bookValidator';

const { getBooks, getBookById, createBook } = bookController;

const router = Router();

router.get('/', getBooks);
router.get('/:id', validate(bookIdParamsSchema, 'params'), getBookById);
router.post('/', validate(createBookBodySchema, 'body'), createBook);

export default router;
