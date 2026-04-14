import { prisma } from '@/lib/prisma';

export const userRepository = {
	async findAll() {
		return await prisma.user.findMany({
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
		return await prisma.user.findUnique({
			where: {
				id,
			},
			select: {
				id: true,
				name: true,
			},
		});
	},

	async findByIdWithBorrows(id: number) {
		return await prisma.user.findUnique({
			where: {
				id,
			},
			select: {
				id: true,
				name: true,
				borrows: {
					select: {
						id: true,
						borrowedAt: true,
						returnedAt: true,
						score: true,
						book: {
							select: {
								id: true,
								name: true,
							},
						},
					},
					orderBy: {
						borrowedAt: 'desc',
					},
				},
			},
		});
	},

	async createUser(name: string) {
		return await prisma.user.create({
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
