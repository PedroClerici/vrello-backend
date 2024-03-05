import { ZodError, type ZodType, type z } from 'zod';

import { BadRequestError } from '@/utils/api-errors';

abstract class AbstractDTO<Schema extends ZodType> {
  protected data: z.infer<Schema>;

  public constructor(data: Record<string, unknown>) {
    this.validate(data);
  }

  protected abstract rules(): Schema;

  public getAll(): z.infer<Schema> {
    return this.data;
  }

  public get<K extends keyof z.infer<Schema>>(key: K) {
    return this.data[key];
  }

  private validate(data: Record<string, unknown>) {
    try {
      this.data = this.rules().parse(data);
    } catch (err) {
      if (err instanceof ZodError)
        throw new BadRequestError('Validation fail', err.issues);
    }
  }
}

export default AbstractDTO;
