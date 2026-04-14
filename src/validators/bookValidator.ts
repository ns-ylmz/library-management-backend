import { z } from 'zod';

export const bookIdParamsSchema = z.object({
	id: z.coerce.number().int().positive(),
});

export const createBookBodySchema = z.object({
	name: z.string().trim().min(1, 'Name is required'),
});

export type BookIdParams = z.infer<typeof bookIdParamsSchema>;
export type CreateBookBody = z.infer<typeof createBookBodySchema>;
