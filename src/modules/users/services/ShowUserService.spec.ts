import 'reflect-metadata';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { FakeUser } from '../models/fakes/FakeUser';
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
    const userData = await fakeUsersRepository.create(new FakeUser());

    const user = await showUser.execute({
      userId: userData.id,
      authUser: { id: userData.id, role: 'admin' },
    });

    expect(user.email).toBe(userData.email);
    expect(user.name).toBe(userData.name);
  });

  it('should not find a non-existing user', async () => {
    const userId = 'not-existent-user-id';

    await expect(
      showUser.execute({ userId, authUser: { id: userId, role: 'admin' } }),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });
});
