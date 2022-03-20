import { CreateRawLogService } from '@modules/logs/services/CreateRawLogService';
import { Response } from 'express';
import morgan, { StreamOptions } from 'morgan';
import { container } from 'tsyringe';

const stream: StreamOptions = {
  write: message => {
    const createRawLogService = container.resolve(CreateRawLogService);
    createRawLogService.execute({ data: message });
    console.log(message);
  },
};

const skip = (_, res: Response) => {
  if (res.statusCode < 400 && process.env.HTTP_LOGS === 'errors') {
    return true;
  }
  return false;
};

const morganMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms',

  { stream, skip },
);

export default morganMiddleware;
