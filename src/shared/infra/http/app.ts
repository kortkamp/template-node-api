import 'reflect-metadata';
import 'dotenv/config';
import httpLogs from '@modules/logs/infra/http/middlewares/httpLogs';
import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import { createServer } from 'http';

import databaseConnection from '@shared/infra/typeorm';

import errorHandling from './middlewares/errorHandling';
import { routes } from './routes';
import '@shared/container';

const app = express();
const server = createServer(app);

databaseConnection().then(() => {
  console.log('database-ready');
  server.emit('database-ready');
});

if (process.env.HTTP_LOGS !== 'none') app.use(httpLogs);

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(errorHandling);

app.get('/', (req, res) => {
  return res.send('Template API Node - 2022');
});

export { server };
