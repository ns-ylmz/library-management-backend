import { NextFunction, Request, Response } from 'express';

import { borrowService } from '@/services/borrowService';

export const borrowController = {
	async borrowBook(req: Request, res: Response, next: NextFunction) {
		try {
			const userId = Number(req.params.userId);
			const bookId = Number(req.params.bookId);
			await borrowService.borrowBook(userId, bookId);
			res.status(201).send();
		} catch (error) {
			next(error);
		}
	},

	async returnBook(req: Request, res: Response, next: NextFunction) {
		try {
			const userId = Number(req.params.userId);
			const bookId = Number(req.params.bookId);
			const { score } = req.body as { score: number };
			await borrowService.returnBook(userId, bookId, score);
			res.status(200).send();
		} catch (error) {
			next(error);
		}
	},
};
