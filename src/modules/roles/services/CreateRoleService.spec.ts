import 'reflect-metadata';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateRoleDTO } from '../dtos/ICreateRoleDTO';
import FakeRolesRepository from '../repositories/fakes/FakeRolesRepository';
import { CreateRoleService } from './CreateRoleService';

let fakeRolesRepository: FakeRolesRepository;

let createRoleService: CreateRoleService;

let roleData: ICreateRoleDTO;

describe('CreateRoleService', () => {
  beforeEach(() => {
    fakeRolesRepository = new FakeRolesRepository();

    createRoleService = new CreateRoleService(fakeRolesRepository);

    roleData = {
      name: 'User',
    };
  });

  it('Should be able to create a new role', async () => {
    const role = await createRoleService.execute(roleData);

    expect(role).toHaveProperty('id');
    expect(role).toHaveProperty('name');

    expect(role?.name).toBe(roleData.name);
  });

  it('Should not create 2 roles with same name ', async () => {
    await createRoleService.execute(roleData);

    await expect(createRoleService.execute(roleData)).rejects.toBeInstanceOf(
      ErrorsApp,
    );
  });
});
