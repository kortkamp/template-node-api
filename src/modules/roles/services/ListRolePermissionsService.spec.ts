import 'reflect-metadata';

import { ICreateRolePermissionDTO } from '../dtos/ICreateRolePermissionDTO';
import FakeRolePermissionsRepository from '../repositories/fakes/FakeRolePermissionsRepository';
import { ListRolePermissionsService } from './ListRolePermissionsService';

let fakeRolePermissionsRepository: FakeRolePermissionsRepository;

let listRolePermissionsService: ListRolePermissionsService;

let rolePermissionData: ICreateRolePermissionDTO;

describe('CreateSessionService', () => {
  beforeEach(() => {
    fakeRolePermissionsRepository = new FakeRolePermissionsRepository();

    listRolePermissionsService = new ListRolePermissionsService(
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

  it('Should be able to list rolePermissions', async () => {
    const rolePermission1 = await fakeRolePermissionsRepository.create(
      rolePermissionData,
    );

    const rolePermission2 = await fakeRolePermissionsRepository.create({
      ...rolePermissionData,
      resource: 'resource2',
    });

    const rolePermissions = await listRolePermissionsService.execute();

    expect(rolePermissions).toEqual([rolePermission1, rolePermission2]);
  });
});
