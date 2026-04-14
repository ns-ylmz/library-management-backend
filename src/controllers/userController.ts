import { NextFunction, Request, Response } from 'express';

import { userService } from '@/services/userService';
import { CreateUserBody, UserIdParams } from '@/validators/userValidator';

export const userController = {
	async getUsers(_req: Request, res: Response, next: NextFunction) {
		try {
			const users = await userService.getUsers();
			res.status(200).json(users);
		} catch (error) {
			next(error);
		}
	},

	async getUserById(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params as unknown as UserIdParams;
			const user = await userService.getUserById(id);
			res.status(200).json(user);
		} catch (error) {
			next(error);
		}
	},

	async createUser(req: Request, res: Response, next: NextFunction) {
		try {
			const { name } = req.body as CreateUserBody;
			await userService.createUser(name);
			res.sendStatus(201);
		} catch (error) {
			next(error);
		}
	},
};
