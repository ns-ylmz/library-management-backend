import { AppError } from '@/errors/appError';
import { userRepository } from '@/repositories/userRepository';

type UserDetailsResponse = {
	id: number;
	name: string;
	books: {
		past: Array<{
			name: string;
			userScore: number;
		}>;
		present: Array<{
			name: string;
		}>;
	};
};

type Borrow = NonNullable<
	Awaited<ReturnType<typeof userRepository.findByIdWithBorrows>>
>['borrows'][number];

export const userService = {
	async getUsers() {
		return await userRepository.findAll();
	},

	async getUserById(id: number): Promise<UserDetailsResponse> {
		const user = await userRepository.findByIdWithBorrows(id);

		if (!user) {
			throw new AppError('User not found', 404);
		}

		const past = user.borrows
			.filter((borrow: Borrow) => borrow.returnedAt !== null)
			.map((borrow: Borrow) => ({
				name: borrow.book.name,
				userScore: borrow.score ?? -1,
			}));

		const present = user.borrows
			.filter((borrow: Borrow) => borrow.returnedAt === null)
			.map((borrow: Borrow) => ({
				name: borrow.book.name,
			}));

		return {
			id: user.id,
			name: user.name,
			books: {
				past,
				present,
			},
		};
	},

	async createUser(name: string): Promise<void> {
		await userRepository.createUser(name);
	},
};
