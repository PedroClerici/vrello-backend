import { type Request, type Response, type NextFunction } from 'express';
import { ZodError, type AnyZodObject } from 'zod';

const validateResource =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).send({
          message: 'Validation error.',
          issues: err.format(),
        });
      }

      return res.status(500).json({ message: 'Internal server error.' });
    }
  };

export default validateResource;
