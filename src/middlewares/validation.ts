import { NextFunction, Request, RequestHandler, Response } from 'express';
import { z, ZodError } from 'zod';

type ValidationTarget = 'body' | 'query' | 'params';

export function validate(
	schema: z.ZodType,
	target: ValidationTarget = 'body',
): RequestHandler {
	return (req: Request, _res: Response, next: NextFunction) => {
		try {
			const validatedData = schema.parse(req[target]);
			(req as Request & Record<ValidationTarget, unknown>)[target] =
				validatedData;
			next();
		} catch (error) {
			if (error instanceof ZodError) {
				return next(error);
			} else {
				return next(error);
			}
		}
	};
}
