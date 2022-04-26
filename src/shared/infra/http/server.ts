import { databaseConnect, databaseDisconnect } from '@shared/infra/typeorm';
import { logger } from '@shared/utils/logger';

import { server } from './app';

const port = process.env.APP_PORT;

enum ExitStatus {
  Failure = 1,
  Success = 0,
}

const shutdown = () => {
  try {
    // close server app
    server.close(async () => {
      // when all requests are resolved
      logger.debug('HTTP server closed');
      await databaseDisconnect();
      logger.info('App exited with success');
      process.exit(ExitStatus.Success);
    });
  } catch (error) {
    logger.error(`App exited with error: ${error}`);
    process.exit(ExitStatus.Failure);
  }
};

const exitSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT'];

exitSignals.map(sig =>
  process.on(sig, async () => {
    logger.debug(`Shutdown signal received`);
    shutdown();
  }),
);

(async () => {
  await databaseConnect();
  server.listen(port, () => {
    logger.info(`Api started on localhost:${port}! 🚀`);
  });
})();
