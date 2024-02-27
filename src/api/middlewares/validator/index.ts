import { BadRequestError } from '@/utils/api-errors';
import { type Request, type Response, type NextFunction } from 'express';
import { type AnyZodObject } from 'zod';
import routesRequirements from './schemas';

export const requirements = routesRequirements;

export const validateRequest =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    const validatedRequirements = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (!validatedRequirements.success) {
      throw new BadRequestError(
        'Validation fail',
        validatedRequirements.error.issues,
      );
    }

    return next();
  };
