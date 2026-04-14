import { z } from 'zod';

export const borrowBookParamsSchema = z.object({
	userId: z.coerce.number().int().positive(),
	bookId: z.coerce.number().int().positive(),
});

export const returnBookBodySchema = z.object({
	score: z.number(),
});

export type BorrowBookParams = z.infer<typeof borrowBookParamsSchema>;
export type ReturnBookBody = z.infer<typeof returnBookBodySchema>;
