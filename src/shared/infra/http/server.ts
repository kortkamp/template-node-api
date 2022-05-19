import { AppDataSource } from '@shared/infra/typeorm';
import { logger } from '@shared/utils/logger';

import { server } from './app';

const port = process.env.PORT;

enum ExitStatus {
  Failure = 1,
  Success = 0,
}

const shutdown = async () => {
  try {
    // close server app
    server.close(async () => {
      // when all requests are resolved
      logger.debug('HTTP server closed');
      // if (await AppDataSource.isInitialized()) {
      // await AppDataSource.destroy();
      logger.debug(`DB connection closed`);
      // }
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

AppDataSource.initialize()
  .then(async () => {
    logger.debug(`Database connected`);
    server.listen(port, () => {
      logger.info(`Api started on localhost:${port}! 🚀`);
    });
  })
  .catch(err => {
    logger.error(
      `Couldn't connect to database: ${process.env.POSTGRES_DB_HOST}`,
    );
    logger.error(err);
  });
