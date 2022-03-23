import 'reflect-metadata';

import { ICreateRoleDTO } from '../dtos/ICreateRoleDTO';
import FakeRolesRepository from '../repositories/fakes/FakeRolesRepository';
import { ListRolesService } from './ListRolesService';

let fakeRolesRepository: FakeRolesRepository;

let listRolesService: ListRolesService;

let roleData: ICreateRoleDTO;

describe('CreateSessionService', () => {
  beforeEach(() => {
    fakeRolesRepository = new FakeRolesRepository();

    listRolesService = new ListRolesService(fakeRolesRepository);

    roleData = {
      name: 'role1',
    };
  });

  it('Should be able to list roles', async () => {
    const role1 = await fakeRolesRepository.create(roleData);

    const role2 = await fakeRolesRepository.create({
      ...roleData,
      name: 'role2',
    });

    const roles = await listRolesService.execute();

    expect(roles).toEqual([role1, role2]);
  });
});
