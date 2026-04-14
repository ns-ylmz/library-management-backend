import { AppError } from '@/errors/appError';
import { bookRepository } from '@/repositories/bookRepository';

type BookDetailsResponse = {
	id: number;
	name: string;
	score: string | -1;
};

export const bookService = {
	async getBooks() {
		return await bookRepository.findAll();
	},

	async getBookById(id: number): Promise<BookDetailsResponse> {
		const book = await bookRepository.findByIdWithScores(id);

		if (!book) {
			throw new AppError('Book not found', 404);
		}

		if (book.borrows.length === 0) {
			return {
				id: book.id,
				name: book.name,
				score: -1,
			};
		}

		const scores = book.borrows
			.map((borrow) => borrow.score)
			.filter((score): score is number => score !== null);

		if (scores.length === 0) {
			return {
				id: book.id,
				name: book.name,
				score: -1,
			};
		}

		const total = scores.reduce((acc, score) => acc + score, 0);
		const average = total / scores.length;

		return {
			id: book.id,
			name: book.name,
			score: average.toFixed(2),
		};
	},

	async createBook(name: string): Promise<void> {
		await bookRepository.createBook(name);
	},
};
