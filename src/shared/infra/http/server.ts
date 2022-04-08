import { logger } from '@shared/utils/logger';

import { server } from './app';

const port = process.env.APP_PORT;

server.on('database-ready', () => {
  server.listen(port, () => {
    logger.info(`Api started on localhost:${port}! 🚀`);
  });
});
