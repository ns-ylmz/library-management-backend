import { AppError } from '@/errors/appError';
import { bookRepository } from '@/repositories/bookRepository';
import { borrowRepository } from '@/repositories/borrowRepository';
import { userRepository } from '@/repositories/userRepository';

export const borrowService = {
	async borrowBook(userId: number, bookId: number): Promise<void> {
		const user = await userRepository.findById(userId);

		if (!user) {
			throw new AppError('User not found', 404);
		}

		const book = await bookRepository.findById(bookId);

		if (!book) {
			throw new AppError('Book not found', 404);
		}

		const existingUserBorrow =
			await borrowRepository.findActiveBorrowsByUserAndBook(userId, bookId);

		if (existingUserBorrow) {
			throw new AppError('User has already borrowed this book', 409);
		}

		const existingBookBorrow =
			await borrowRepository.findActiveBorrowsByBookId(bookId);

		if (existingBookBorrow) {
			throw new AppError('Book is currently borrowed by another user', 409);
		}

		await borrowRepository.create(userId, bookId);
	},

	async returnBook(
		userId: number,
		bookId: number,
		score: number,
	): Promise<void> {
		const user = await userRepository.findById(userId);

		if (!user) {
			throw new AppError('User not found', 404);
		}

		const book = await bookRepository.findById(bookId);

		if (!book) {
			throw new AppError('Book not found', 404);
		}

		const activeBorrow = await borrowRepository.findActiveBorrowsByUserAndBook(
			userId,
			bookId,
		);

		if (!activeBorrow) {
			throw new AppError('No active borrow found for this user and book', 409);
		}

		await borrowRepository.returnBorrow(activeBorrow.id, score);
	},
};
