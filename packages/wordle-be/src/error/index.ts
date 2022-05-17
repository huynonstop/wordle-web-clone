import type {ErrorRequestHandler} from 'express';
import {
  BadRequest,
  CustomError,
  Forbidden, NotFound,
  Unauthorized,
} from './customError';

export const defaultErrorHandler: ErrorRequestHandler = (err, req, res) => {
  res.status(+err.statusCode || +err.status || 500);
  if (err.name) {
    return res.json({
      message: err.message,
      error: err.name,
    });
  }
  return res.json({
    message: 'Internal server error',
    error: err.message,
  });
};

export const customErrorHandler: ErrorRequestHandler = (
    err: CustomError,
    req,
    res,
    next,
) => {
  if (
    // ES2016
    err instanceof BadRequest ||
    err instanceof NotFound ||
    err instanceof Forbidden ||
    err instanceof Unauthorized
    // ES2015
    // err.name === CustomErrorName.BadRequest ||
    // err.name === CustomErrorName.NotFound ||
    // err.name === CustomErrorName.Forbidden ||
    // err.name === CustomErrorName.Unauthorized
  ) {
    const {message, name, statusCode} = err;
    return res.status(statusCode).json({
      error: name,
      message: message || name,
    });
  }
  next(err);
};
