import express from 'express';
import cors from 'cors';

import {customErrorHandler, defaultErrorHandler} from './error/index';
import {NotFound} from './error/customError';
import apiRouter from './apiRouter';


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/hello', (req, res) => {
  res.json({
    message: 'helloworld',
  });
});
app.use('/api', apiRouter);
app.use('*', (req, res, next) => {
  next(new NotFound('Not Found Route'));
});
app.use(customErrorHandler, defaultErrorHandler);
export default app;
