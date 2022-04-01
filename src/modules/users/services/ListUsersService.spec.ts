import 'reflect-metadata';
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
    const user1 = await fakeUsersRepository.create({
      email: 'johndoe@example.com',
      name: 'John Doe',
      role_id: '1111',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      email: 'johntre@example.com',
      name: 'John Tre',
      role_id: '2222',
      password: '123456',
    });

    const allUsers = await listUsers.execute();

    expect(allUsers).toEqual([user1, user2]);
  });
});
