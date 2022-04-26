import {
  Connection,
  createConnection,
  getConnectionOptions,
  getConnectionManager,
} from 'typeorm';

import { logger } from '@shared/utils/logger';

const databaseConnect = async (
  host = process.env.POSTGRES_DB_HOST,
): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  const connection = await createConnection(
    Object.assign(defaultOptions, {
      host: process.env.NODE_ENV === 'test' ? 'localhost' : host,
      database:
        process.env.NODE_ENV === 'test'
          ? 'template_test'
          : defaultOptions.database,
    }),
  );
  logger.debug(`Database connected`);
  return connection;
};

const databaseDisconnect = async () => {
  const conn = getConnectionManager().get();
  await conn.close();
  logger.debug(`DB connection closed`);
};

export { databaseConnect, databaseDisconnect };
