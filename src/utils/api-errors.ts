export interface ApiError extends Error {
  statusCode: number;
  issues?: { _errors: string[] };
}

export class BadRequestError extends Error implements ApiError {
  public readonly statusCode: number;

  public readonly issues?: { _errors: string[] };

  constructor(message: string, issues?: { _errors: string[] }) {
    super(message);
    this.issues = issues;
    this.statusCode = 400;
  }
}

export class UnauthorizedError extends Error implements ApiError {
  public readonly statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 401;
  }
}

export class NotFoundError extends Error implements ApiError {
  public readonly statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 401;
  }
}
