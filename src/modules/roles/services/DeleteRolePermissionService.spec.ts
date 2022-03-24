import 'reflect-metadata';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateRolePermissionDTO } from '../dtos/ICreateRolePermissionDTO';
import { IRolePermission } from '../models/IRolePermission';
import FakeRolePermissionsRepository from '../repositories/fakes/FakeRolePermissionsRepository';
import { DeleteRolePermissionService } from './DeleteRolePermissionService';

let fakeRolePermissionsRepository: FakeRolePermissionsRepository;
let deleteRolePermissionService: DeleteRolePermissionService;
let rolePermission: IRolePermission;

describe('DeleteRolePermission', () => {
  const newRolePermissionData: ICreateRolePermissionDTO = {
    resource: 'resource',
    role_id: 'xxx',
    list: true,
    create: true,
    read: true,
    update: true,
    delete: true,
  };

  beforeEach(async () => {
    fakeRolePermissionsRepository = new FakeRolePermissionsRepository();

    deleteRolePermissionService = new DeleteRolePermissionService(
      fakeRolePermissionsRepository,
    );

    rolePermission = await fakeRolePermissionsRepository.create(
      newRolePermissionData,
    );
  });

  it('should be able to delete a rolePermission', async () => {
    const deleteRolePermissionResult =
      await deleteRolePermissionService.execute(rolePermission.id);

    const rolePermissions = await fakeRolePermissionsRepository.getAll();

    expect(rolePermissions).toHaveLength(0);

    expect(deleteRolePermissionResult).toBeUndefined();
  });

  it('should not be able to delete a rolePermission if it does not exist', async () => {
    await expect(
      deleteRolePermissionService.execute('user non-existing'),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });
});
