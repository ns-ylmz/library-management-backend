import { NextFunction, Request, Response } from 'express';

import { userService } from '@/services/userService';

export const userController = {
	async getUsers(req: Request, res: Response, next: NextFunction) {
		try {
			const users = await userService.getUsers();
			res.status(200).json(users);
		} catch (error) {
			next(error);
		}
	},

	async getUserById(req: Request, res: Response, next: NextFunction) {
		try {
			const userId = Number(req.params.id);
			const user = await userService.getUserById(userId);
			res.status(200).json(user);
		} catch (error) {
			next(error);
		}
	},

	async createUser(req: Request, res: Response, next: NextFunction) {
		try {
			const { name } = req.body as { name: string };
			await userService.createUser(name);
			res.status(201).send();
		} catch (error) {
			next(error);
		}
	},
};
