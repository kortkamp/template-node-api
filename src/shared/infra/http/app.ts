import 'reflect-metadata';
import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import { createServer } from 'http';

import databaseConnection from '@shared/infra/typeorm';

import errorHandling from './middlewares/errorHandling';
import { routes } from './routes';
import '@shared/container';

databaseConnection();
const app = express();

const server = createServer(app);

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(errorHandling);

app.get('/', (req, res) => {
  return res.send('Template API Node - 2022');
});

export { server };
