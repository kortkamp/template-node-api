import 'reflect-metadata';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateRoleDTO } from '../dtos/ICreateRoleDTO';
import { IRole } from '../models/IRole';
import FakeRolesRepository from '../repositories/fakes/FakeRolesRepository';
import { UpdateRoleService } from './UpdateRoleService';

let fakeRolesRepository: FakeRolesRepository;

let updateRoleService: UpdateRoleService;

let roleData: ICreateRoleDTO;

let role: IRole;

describe('UpdateRoleService', () => {
  beforeEach(async () => {
    fakeRolesRepository = new FakeRolesRepository();

    updateRoleService = new UpdateRoleService(fakeRolesRepository);

    roleData = {
      name: 'User',
    };

    role = await fakeRolesRepository.create(roleData);
  });

  it('Should be able to update a role', async () => {
    const updateRoleDate = { name: 'Admin' };

    const updatedRole = await updateRoleService.execute({
      roleId: role.id,
      data: updateRoleDate,
    });

    const storedRole = await fakeRolesRepository.findById(role.id);

    expect(updatedRole).toHaveProperty('id');
    expect(updatedRole).toMatchObject(updateRoleDate);
    expect(updatedRole?.id).toBe(role.id);
    expect(storedRole).toMatchObject(updateRoleDate);
  });

  it('Should not be able to update a nonexistent role', async () => {
    const updateRoleDate = { name: 'Admin' };

    await expect(
      updateRoleService.execute({
        roleId: 'nonexistent role id',
        data: updateRoleDate,
      }),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });

  it('Should not be able to update a role name to a already existent role name', async () => {
    const anotherRoleData = {
      name: 'guest-user',
    };

    const anotherRole = await fakeRolesRepository.create(anotherRoleData);

    await expect(
      updateRoleService.execute({
        roleId: anotherRole.id,
        data: { name: roleData.name },
      }),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });
});
