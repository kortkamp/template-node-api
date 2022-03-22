import ErrorLogsRepository from '@modules/logs/infra/typeorm/repositories/ErrorLogsRepository';
import MailErrorLogsRepository from '@modules/logs/infra/typeorm/repositories/MailErrorLogsRepository';
import RawLogsRepository from '@modules/logs/infra/typeorm/repositories/RawLogsRepository';
import IErrorLogsRepository from '@modules/logs/repositories/IErrorLogsRepository';
import IMailErrorLogsRepository from '@modules/logs/repositories/IMailErrorLogsRepository';
import IRawLogsRepository from '@modules/logs/repositories/IRawLogsRepository';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IUserTokensRepository } from '@modules/users/repositories/IUserTokensRepository';
import { container } from 'tsyringe';

import '@shared/container/providers';

import { BCryptHashProvider } from './HashProvider/implementations/BCryptHashProvider';
import { IHashProvider } from './HashProvider/models/IHashProvider';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
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

container.registerSingleton<IMailErrorLogsRepository>(
  'MailErrorLogsRepository',
  MailErrorLogsRepository,
);
