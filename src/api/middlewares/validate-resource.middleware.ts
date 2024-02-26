import { BadRequestError } from '@/utils/api-errors';
import { type Request, type Response, type NextFunction } from 'express';
import { type AnyZodObject } from 'zod';

const validateResource =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    const validatedSchema = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (!validatedSchema.success) {
      throw new BadRequestError(
        'Validation fail',
        validatedSchema.error.issues,
      );
    }

    return next();
  };

export default validateResource;
