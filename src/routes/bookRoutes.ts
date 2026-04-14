import { Router } from 'express';

import { bookController } from '@/controllers/bookController';

const router = Router();

router.get('/', bookController.getBooks);
router.get('/:id', bookController.getBookById);
router.post('/', bookController.createBook);

export default router;
