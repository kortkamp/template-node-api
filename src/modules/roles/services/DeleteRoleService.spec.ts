import 'reflect-metadata';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { IRole } from '../models/IRole';
import FakeRolesRepository from '../repositories/fakes/FakeRolesRepository';
import { DeleteRoleService } from './DeleteRoleService';

let fakeRolesRepository: FakeRolesRepository;
let deleteRoleService: DeleteRoleService;
let role: IRole;

describe('DeleteRole', () => {
  const newRoleData = {
    name: 'role1',
  };

  beforeEach(async () => {
    fakeRolesRepository = new FakeRolesRepository();

    deleteRoleService = new DeleteRoleService(fakeRolesRepository);

    role = await fakeRolesRepository.create(newRoleData);
  });

  it('should be able to delete a role', async () => {
    const deleteRoleResult = await deleteRoleService.execute(role.id);

    const roles = await fakeRolesRepository.getAll();

    expect(roles).toHaveLength(0);

    expect(deleteRoleResult).toBeUndefined();
  });

  it('should not be able to delete a role if it does not exist', async () => {
    await expect(
      deleteRoleService.execute('user non-existing'),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });
});
