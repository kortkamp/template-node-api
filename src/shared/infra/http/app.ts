import 'reflect-metadata';
import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import { createServer } from 'http';

import databaseConnection from '@shared/infra/typeorm';

databaseConnection();
const app = express();

const server = createServer(app);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  return res.send('Template API Node - 2022');
});

export { server };
