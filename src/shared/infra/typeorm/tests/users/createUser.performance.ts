/* eslint-disable no-await-in-loop */
import { ICreateRoleDTO } from '@modules/roles/dtos/ICreateRoleDTO';
import { RolesRepository } from '@modules/roles/infra/typeorm/repositories/RolesRepository';
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { hash } from 'bcryptjs';
import 'dotenv/config';
import { differenceInMilliseconds } from 'date-fns';
import { createConnection, getConnectionOptions } from 'typeorm';
import { IUser } from '@modules/users/models/IUser';
import { User } from '@modules/users/infra/typeorm/models/User';

const ITERATIONS = 1000;

interface IPerformanceResult {
  iterations: number;
  totalTime: number;
  meanTime: number;
}

async function create(): Promise<IPerformanceResult> {
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

  const startTime = new Date();

  const admin: ICreateUserDTO = {
    email: 'admin@template.com',
    name: 'Admin',
    active: true,
    role_id: adminRole.id,
    password: await hash('123456', 8),
  };

  const userIds: string[] = [];
  let user: User;

  for (let i = 0; i < ITERATIONS; i += 1) {
    user = await usersRepository.create({ ...admin, email: `${i}@test.com` });
    userIds.push(user.id);
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const id of userIds) {
    const user = await usersRepository.findById(id);
    console.log('delete ', id);
    await usersRepository.delete(user);
  }

  await connection.close();

  const totalTime = differenceInMilliseconds(new Date(), startTime);

  return {
    iterations: ITERATIONS,
    totalTime,
    meanTime: totalTime / ITERATIONS,
  };
}

create().then(result => console.log(result));
