import morgan from 'morgan';

import { logger } from '@shared/utils/logger';

const stream = {
  write: (message: string) =>
    // remove CR on the end of message
    logger.http(message.replace(/(\r\n|\n|\r)/gm, '')),
};

// const skip = () => {
//   const env = process.env.ENVIRONMENT || 'dev';
//   return env !== 'dev';
// };

const morganMiddleware = morgan(
  ':remote-addr :method :url :status :res[content-length] - :response-time ms',
  { stream },
);

export { morganMiddleware };
