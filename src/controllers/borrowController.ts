import { NextFunction, Request, Response } from 'express';

import { borrowService } from '@/services/borrowService';
import { BorrowBookParams, ReturnBookBody } from '@/validators/borrowValidator';

export const borrowController = {
	async borrowBook(req: Request, res: Response, next: NextFunction) {
		try {
			const { bookId, userId } = req.params as unknown as BorrowBookParams;
			await borrowService.borrowBook(userId, bookId);
			return res.status(204).end();
		} catch (error) {
			return next(error);
		}
	},

	async returnBook(req: Request, res: Response, next: NextFunction) {
		try {
			const { bookId, userId } = req.params as unknown as BorrowBookParams;
			const { score } = req.body as ReturnBookBody;
			await borrowService.returnBook(userId, bookId, score);
			return res.status(204).end();
		} catch (error) {
			return next(error);
		}
	},
};
