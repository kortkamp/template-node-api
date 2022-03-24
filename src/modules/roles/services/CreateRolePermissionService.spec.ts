import 'reflect-metadata';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateRolePermissionDTO } from '../dtos/ICreateRolePermissionDTO';
import FakeRolePermissionsRepository from '../repositories/fakes/FakeRolePermissionsRepository';
import { CreateRolePermissionService } from './CreateRolePermissionService';

let fakeRolePermissionsRepository: FakeRolePermissionsRepository;

let createRolePermissionService: CreateRolePermissionService;

let rolePermissionData: ICreateRolePermissionDTO;

describe('CreateRolePermissionService', () => {
  beforeEach(() => {
    fakeRolePermissionsRepository = new FakeRolePermissionsRepository();

    createRolePermissionService = new CreateRolePermissionService(
      fakeRolePermissionsRepository,
    );

    rolePermissionData = {
      resource: 'resource',
      role_id: '',
      list: true,
      create: true,
      read: true,
      update: true,
      delete: true,
    };
  });

  it('Should be able to create a new rolePermission', async () => {
    const rolePermission = await createRolePermissionService.execute(
      rolePermissionData,
    );

    expect(rolePermission).toHaveProperty('id');
    expect(rolePermission).toHaveProperty('resource');

    expect(rolePermission?.resource).toBe(rolePermissionData.resource);
  });

  it('Should not create 2 rolePermissions for the same resource', async () => {
    await createRolePermissionService.execute(rolePermissionData);

    await expect(
      createRolePermissionService.execute(rolePermissionData),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });
});
