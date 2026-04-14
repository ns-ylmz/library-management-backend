import { z } from 'zod';

export const userIdParamsSchema = z.object({
	id: z.coerce.number().int().positive(),
});

export const createUserBodySchema = z.object({
	name: z.string().trim().min(1, 'Name is required'),
});

export type UserIdParams = z.infer<typeof userIdParamsSchema>;
export type CreateUserBody = z.infer<typeof createUserBodySchema>;
