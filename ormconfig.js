const mainFolder = process.env.ENVIRONMENT !== 'local' ? `dist/src` : 'src';

const postgres = {
  name: process.env.POSTGRES_DB_NAME,
  type: 'postgres',
  host:
    process.env.ENVIRONMENT === 'local' && process.env.MIGRATION
      ? 'localhost'
      : process.env.POSTGRES_DB_HOST,
  port: process.env.POSTGRES_DB_PORT,
  username: process.env.POSTGRES_DB_USERNAME,
  password: process.env.POSTGRES_DB_PASSWORD,
  database: process.env.POSTGRES_DB_DATABASE,
  entities: [`./${mainFolder}/modules/**/infra/typeorm/models/*{.ts,.js}`],
  migrations: [`./${mainFolder}/shared/infra/typeorm/migrations/*{.ts,.js}`],
  cli: {
    migrationsDir: `./${mainFolder}/shared/infra/typeorm/migrations`,
  },
};

module.exports = [postgres];
