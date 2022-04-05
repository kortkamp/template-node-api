import { parseQueryFilters } from '@shared/helpers/filter/parsers/parseQueryFilters';

import 'reflect-metadata';
import { FakeUser } from '../models/fakes/FakeUser';
import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';
import { ListUsersService } from './ListUsersService';

let fakeUsersRepository: FakeUsersRepository;
let listUsers: ListUsersService;

describe('ListUsers', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listUsers = new ListUsersService(fakeUsersRepository);
  });

  it('should be able to list users', async () => {
    const user1 = await fakeUsersRepository.create(new FakeUser());

    const user2 = await fakeUsersRepository.create(new FakeUser());

    const { result } = await listUsers.execute(parseQueryFilters({}));

    expect(result).toEqual([user1, user2]);
  });
});
