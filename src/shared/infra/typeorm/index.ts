import { Role } from '@modules/roles/infra/typeorm/models/Role';
import { User } from '@modules/users/infra/typeorm/models/User';
import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';
import 'reflect-metadata';

const dataSourceOptions: DataSourceOptions = {
  name: process.env.POSTGRES_DB_NAME,
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl:
    process.env.ENVIRONMENT === 'prod' ? { rejectUnauthorized: false } : false,
  // host:
  //   process.env.NODE_ENV === 'test'
  //     ? 'localhost'
  //     : process.env.POSTGRES_DB_HOST,
  // port: Number(process.env.POSTGRES_DB_PORT || '5432'),
  // username: process.env.POSTGRES_DB_USERNAME,
  // password: process.env.POSTGRES_DB_PASSWORD,
  // database:
  //   process.env.NODE_ENV === 'test'
  //     ? 'template_test'
  //     : process.env.POSTGRES_DB_DATABASE,
  entities: [User, Role],
  migrations: [`./dist/src/shared/infra/typeorm/migrations/*.js`],
};

export const AppDataSource = new DataSource(dataSourceOptions);
