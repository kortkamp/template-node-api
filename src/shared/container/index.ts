import '@shared/container/providers';

import { RolePermissionsRepository } from '@modules/roles/infra/typeorm/repositories/RolePermissionsRepository';
import { RolesRepository } from '@modules/roles/infra/typeorm/repositories/RolesRepository';
import { IRolePermissionsRepository } from '@modules/roles/repositories/IRolePermissionsRepository';
import { IRolesRepository } from '@modules/roles/repositories/IRolesRepository';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { UserTokensRepository } from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IUserTokensRepository } from '@modules/users/repositories/IUserTokensRepository';
import { container } from 'tsyringe';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<IRolesRepository>(
  'RolesRepository',
  RolesRepository,
);

container.registerSingleton<IRolePermissionsRepository>(
  'RolePermissionsRepository',
  RolePermissionsRepository,
);
