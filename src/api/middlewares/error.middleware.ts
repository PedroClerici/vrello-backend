import { type NextFunction, type Request, type Response } from 'express';

import { type ApiError } from '@/utils/api-errors';
import { logger } from '@/config';

const errorMiddleware = (
  err: Error & Partial<ApiError>,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  const statusCode = err.statusCode ?? 500;
  const message = err.statusCode ? err.message : 'Internal server error';

  if (err.issues) {
    return res.status(statusCode).json({ message, issues: err.issues });
  }

  if (statusCode === 500) {
    logger.error(err, `Internal server error on route: ${req.url}`);
  }

  return res.status(statusCode).json({ message });
};

export default errorMiddleware;
