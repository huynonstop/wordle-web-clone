export interface CustomError {
  statusCode: number;
  name: string;
  message: string;
}

enum CustomErrorName {
  BadRequest = 'BadRequest',
  NotFound = 'NotFound',
  Forbidden = 'Forbidden',
  Unauthorized = 'Unauthorized',
}

export class BadRequest extends Error implements CustomError {
  statusCode: number = 400;
  constructor(message: string) {
    super(message);
    this.name = CustomErrorName.BadRequest;
  }
}

export class NotFound extends Error implements CustomError {
  statusCode: number = 404;
  constructor(message: string) {
    super(message);
    this.name = CustomErrorName.NotFound;
  }
}

export class Forbidden extends Error implements CustomError {
  statusCode: number = 403;
  constructor(message: string) {
    super(message);
    this.name = CustomErrorName.Forbidden;
  }
}
export class Unauthorized extends Error implements CustomError {
  statusCode: number = 401;
  constructor(message: string) {
    super(message);
    this.name = CustomErrorName.Unauthorized;
  }
}
