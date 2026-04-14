import { prisma } from '@/lib/prisma';

export const borrowRepository = {
	async findActiveBorrowsByUserAndBook(userId: number, bookId: number) {
		return await prisma.borrow.findFirst({
			where: {
				userId,
				bookId,
				returnedAt: null,
			},
			select: {
				id: true,
				userId: true,
				bookId: true,
				borrowedAt: true,
				returnedAt: true,
				score: true,
			},
		});
	},

	async findActiveBorrowsByBookId(bookId: number) {
		return await prisma.borrow.findFirst({
			where: {
				bookId,
				returnedAt: null,
			},
			select: {
				id: true,
				userId: true,
				bookId: true,
				borrowedAt: true,
			},
		});
	},

	async create(userId: number, bookId: number) {
		return await prisma.borrow.create({
			data: {
				userId,
				bookId,
			},
			select: {
				id: true,
				userId: true,
				bookId: true,
				borrowedAt: true,
				returnedAt: true,
				score: true,
			},
		});
	},

	async returnBorrow(id: number, score: number) {
		return await prisma.borrow.update({
			where: { id },
			data: {
				returnedAt: new Date(),
				score,
			},
			select: {
				id: true,
				userId: true,
				bookId: true,
				borrowedAt: true,
				returnedAt: true,
				score: true,
			},
		});
	},
};
