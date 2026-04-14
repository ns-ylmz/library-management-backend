import { NextFunction, Request, Response } from 'express';

import { bookService } from '@/services/bookService';

export const bookController = {
	async getBooks(req: Request, res: Response, next: NextFunction) {
		try {
			const books = await bookService.getBooks();
			res.status(200).json(books);
		} catch (error) {
			next(error);
		}
	},

	async getBookById(req: Request, res: Response, next: NextFunction) {
		try {
			const bookId = Number(req.params.id);
			const book = await bookService.getBookById(bookId);
			res.status(200).json(book);
		} catch (error) {
			next(error);
		}
	},

	async createBook(req: Request, res: Response, next: NextFunction) {
		try {
			const { name } = req.body as { name: string };
			await bookService.createBook(name);
			res.status(201).send();
		} catch (error) {
			next(error);
		}
	},
};
