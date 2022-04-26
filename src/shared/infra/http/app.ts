import 'reflect-metadata';
import 'dotenv/config';
import upload from '@config/upload';
import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import { createServer } from 'http';
import { serve, setup } from 'swagger-ui-express';

import swaggerConfig from '../../../docs';
import errorHandling from './middlewares/errorHandling';
import { morganMiddleware } from './middlewares/morganMiddleware';
import rateLimiter from './middlewares/rateLimiter';
import { routes } from './routes';
import '@shared/container';

const app = express();
const server = createServer(app);

app.use(morganMiddleware);

app.use(rateLimiter);
app.use(cors());
app.use(express.json());

if (process.env.STORAGE_DRIVER === 'disk') {
  app.use('/avatar', express.static(`${upload('avatar').uploadsFolder}/`));
}

app.use(routes);

app.use('/api-docs', serve, setup(swaggerConfig));

app.use(errorHandling);

app.get('/', (req, res) => {
  return res.send('Template API Node - 2022');
});

// setTimeout(() => {
//   throw new Error('timeout error');
// }, 4000);

export { server };
