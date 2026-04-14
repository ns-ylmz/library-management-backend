import { NextFunction, Request, Response } from 'express';

import { borrowService } from '@/services/borrowService';
import { BorrowBookParams, ReturnBookBody } from '@/validators/borrowValidator';

export const borrowController = {
	async borrowBook(req: Request, res: Response, next: NextFunction) {
		try {
			const { bookId, userId } = req.params as unknown as BorrowBookParams;
			await borrowService.borrowBook(userId, bookId);
			res.status(201).send();
		} catch (error) {
			next(error);
		}
	},

	async returnBook(req: Request, res: Response, next: NextFunction) {
		try {
			const { bookId, userId } = req.params as unknown as BorrowBookParams;
			const { score } = req.body as ReturnBookBody;
			await borrowService.returnBook(userId, bookId, score);
			res.status(200).send();
		} catch (error) {
			next(error);
		}
	},
};
