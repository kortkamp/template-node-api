import { ICreateRoleDTO } from '@modules/roles/dtos/ICreateRoleDTO';
import { RolesRepository } from '@modules/roles/infra/typeorm/repositories/RolesRepository';
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { hash } from 'bcryptjs';
import 'dotenv/config';
import { createConnection, getConnectionOptions } from 'typeorm';

async function create() {
  const defaultOptions = await getConnectionOptions();
  const connection = await createConnection(
    Object.assign(defaultOptions, {
      host:
        process.env.ENVIRONMENT === 'local'
          ? 'localhost'
          : process.env.POSTGRES_DB_HOST,
    }),
  );
  const rolesRepository = new RolesRepository();
  const usersRepository = new UsersRepository();

  const roleData: ICreateRoleDTO = {
    name: 'super-admin',
  };

  const adminRole = await rolesRepository.create(roleData);

  const admin: ICreateUserDTO = {
    email: 'admin@template.com',
    name: 'Admin',
    active: true,
    role_id: adminRole.id,
    password: await hash('123456', 8),
  };

  await usersRepository.create(admin);
  await connection.close();
}

create().then(() => console.log('User admin Created!'));
