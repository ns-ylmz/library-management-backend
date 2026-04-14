import { NextFunction, Request, Response } from 'express';

import { bookService } from '@/services/bookService';
import { BookIdParams, CreateBookBody } from '@/validators/bookValidator';

export const bookController = {
	async getBooks(_req: Request, res: Response, next: NextFunction) {
		try {
			const books = await bookService.getBooks();
			return res.status(200).json(books);
		} catch (error) {
			return next(error);
		}
	},

	async getBookById(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params as unknown as BookIdParams;
			const book = await bookService.getBookById(id);
			return res.status(200).json(book);
		} catch (error) {
			return next(error);
		}
	},

	async createBook(req: Request, res: Response, next: NextFunction) {
		try {
			const { name } = req.body as CreateBookBody;
			await bookService.createBook(name);
			return res.status(201).end();
		} catch (error) {
			return next(error);
		}
	},
};
