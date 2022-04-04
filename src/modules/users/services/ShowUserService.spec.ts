import 'reflect-metadata';

import ErrorsApp from '@shared/errors/ErrorsApp';

import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';
import { ShowUserService } from './ShowUserService';

let fakeUsersRepository: FakeUsersRepository;
let showUser: ShowUserService;

describe('ShowUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showUser = new ShowUserService(fakeUsersRepository);
  });

  it('should be able to find one user by id', async () => {
    const user = fakeUsersRepository.create({
      email: 'johndoe@example.com',
      role_id: '111',
      name: 'John Doe',
      password: '123456',
    });

    const userId = (await user).id;

    await showUser.execute({ userId, authUser: { id: userId, role: 'admin' } });

    expect((await user).email).toBe('johndoe@example.com');
    expect((await user).password).toBe('123456');
  });

  it('should not find a non-existing user', async () => {
    const userId = 'not-existent-user-id';

    await expect(
      showUser.execute({ userId, authUser: { id: userId, role: 'admin' } }),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });
});
