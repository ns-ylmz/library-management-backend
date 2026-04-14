import { prisma } from '@/lib/prisma';

export const bookRepository = {
	async findAll() {
		return await prisma.book.findMany({
			select: {
				id: true,
				name: true,
			},
			orderBy: {
				id: 'asc',
			},
		});
	},

	async findById(id: number) {
		return await prisma.book.findUnique({
			where: {
				id,
			},
			select: {
				id: true,
				name: true,
			},
		});
	},

	async findByIdWithScores(id: number) {
		return await prisma.book.findUnique({
			where: {
				id,
			},
			select: {
				id: true,
				name: true,
				borrows: {
					where: {
						score: {
							not: null,
						},
						returnedAt: {
							not: null,
						},
					},
					select: {
						score: true,
					},
				},
			},
		});
	},

	async createBook(name: string) {
		return await prisma.book.create({
			data: {
				name,
			},
			select: {
				id: true,
				name: true,
			},
		});
	},
};
