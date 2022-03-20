import ErrorLogsRepository from '@modules/logs/infra/typeorm/repositories/ErrorLogsRepository';
import RawLogsRepository from '@modules/logs/infra/typeorm/repositories/RawLogsRepository';
import IErrorLogsRepository from '@modules/logs/repositories/IErrorLogsRepository';
import IRawLogsRepository from '@modules/logs/repositories/IRawLogsRepository';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { container } from 'tsyringe';

import { BCryptHashProvider } from './HashProvider/implementation/BCryptHashProvider';
import { IHashProvider } from './HashProvider/models/IHashProvider';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);

container.registerSingleton<IErrorLogsRepository>(
  'ErrorLogsRepository',
  ErrorLogsRepository,
);

container.registerSingleton<IRawLogsRepository>(
  'RawLogsRepository',
  RawLogsRepository,
);
