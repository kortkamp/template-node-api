import 'reflect-metadata';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateRolePermissionDTO } from '../dtos/ICreateRolePermissionDTO';
import { IRolePermission } from '../models/IRolePermission';
import FakeRolePermissionsRepository from '../repositories/fakes/FakeRolePermissionsRepository';
import { UpdateRolePermissionService } from './UpdateRolePermissionService';

let fakeRolePermissionsRepository: FakeRolePermissionsRepository;

let updateRolePermissionService: UpdateRolePermissionService;

let rolePermissionData: ICreateRolePermissionDTO;

let rolePermission: IRolePermission;

describe('UpdateRolePermissionService', () => {
  beforeEach(async () => {
    fakeRolePermissionsRepository = new FakeRolePermissionsRepository();

    updateRolePermissionService = new UpdateRolePermissionService(
      fakeRolePermissionsRepository,
    );

    rolePermissionData = {
      resource: 'resource',
      role_id: '1',
      list: true,
      create: true,
      read: true,
      update: true,
      delete: true,
    };

    rolePermission = await fakeRolePermissionsRepository.create(
      rolePermissionData,
    );
  });

  it('Should be able to update a rolePermission', async () => {
    const updateRolePermissionDate = {
      resource: 'resource2',
      role_id: '1',
      list: false,
      create: true,
      read: false,
      update: true,
      delete: false,
    };

    const updatedRolePermission = await updateRolePermissionService.execute({
      rolePermissionId: rolePermission.id,
      data: updateRolePermissionDate,
    });

    const storedRolePermission = await fakeRolePermissionsRepository.findById(
      rolePermission.id,
    );

    expect(updatedRolePermission).toHaveProperty('id');
    expect(updatedRolePermission).toMatchObject(updateRolePermissionDate);
    expect(updatedRolePermission?.id).toBe(rolePermission.id);
    expect(storedRolePermission).toMatchObject(updateRolePermissionDate);
  });

  it('Should not be able to update a nonexistent rolePermission', async () => {
    const updateRolePermissionDate = {
      resource: 'resource2',
      role_id: '',
      list: true,
      create: true,
      read: true,
      update: false,
      delete: true,
    };

    await expect(
      updateRolePermissionService.execute({
        rolePermissionId: 'nonexistent rolePermission id',
        data: updateRolePermissionDate,
      }),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });

  it('Should not be able to update a rolePermission resource to a already existent', async () => {
    const anotherRolePermissionData = {
      resource: 'resource3',
      role_id: '',
      list: true,
      create: true,
      read: true,
      update: true,
      delete: true,
    };

    const anotherRolePermission = await fakeRolePermissionsRepository.create(
      anotherRolePermissionData,
    );

    await expect(
      updateRolePermissionService.execute({
        rolePermissionId: anotherRolePermission.id,
        data: { resource: rolePermissionData.resource },
      }),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });
});
