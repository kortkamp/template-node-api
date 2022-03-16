import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (
  host = process.env.POSTGRES_DB_HOST,
): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  const connection = await createConnection(
    Object.assign(defaultOptions, {
      host: process.env.NODE_ENV === 'test' ? 'localhost' : host,
      database:
        process.env.NODE_ENV === 'test'
          ? 'modelo_test'
          : defaultOptions.database,
    }),
  );
  return connection;
};
