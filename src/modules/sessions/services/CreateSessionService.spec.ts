import 'reflect-metadata';
import { FakeRole } from '@modules/roles/models/fakes/FakeRole';
import { IRole } from '@modules/roles/models/IRole';
import FakeRolesRepository from '@modules/roles/repositories/fakes/FakeRolesRepository';
import { FakeUser } from '@modules/users/models/fakes/FakeUser';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUserRepository';

import { FakeHashProvider } from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';
import ErrorsApp from '@shared/errors/ErrorsApp';

import { CreateSessionService } from './CreateSessionService';

let fakeUsersRepository: FakeUsersRepository;
let fakeRolesRepository: FakeRolesRepository;
let fakeHashProvider: FakeHashProvider;

let createSessionService: CreateSessionService;

let fakeRole: IRole;

describe('CreateSessionService', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeRolesRepository = new FakeRolesRepository();

    fakeRole = await fakeRolesRepository.create(new FakeRole());

    createSessionService = new CreateSessionService(
      fakeUsersRepository,
      fakeRolesRepository,
      fakeHashProvider,
    );
  });

  it('Should be able to create a session', async () => {
    const user = await fakeUsersRepository.create(
      new FakeUser({ role_id: fakeRole.id }),
    );

    // activate user
    user.active = true;
    await fakeUsersRepository.save(user);

    const session = await createSessionService.execute({
      email: user.email,
      password: user.password,
    });

    expect(session).toHaveProperty('token');
    expect(session).toHaveProperty('user');

    expect(session?.user?.id).toBe(user.id);
  });

  it('Should return an error when email or password is incorrect from login', async () => {
    const user = await fakeUsersRepository.create(new FakeUser());

    await expect(
      createSessionService.execute({
        email: user.email,
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(ErrorsApp);

    await expect(
      createSessionService.execute({
        email: 'wrong-password@gmail.com',
        password: user.password,
      }),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });

  it('Should not be able to login if account is inactive', async () => {
    const user = await fakeUsersRepository.create(new FakeUser());

    user.active = false;

    await fakeUsersRepository.save(user);

    await expect(
      createSessionService.execute({
        email: user.email,
        password: user.password,
      }),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });

  it('Should not be able to login if role does not exists', async () => {
    const user = await fakeUsersRepository.create(
      new FakeUser({ role_id: 'not-existing-role-id' }),
    );

    user.active = true;

    await fakeUsersRepository.save(user);

    await expect(
      createSessionService.execute({
        email: user.email,
        password: user.password,
      }),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });
});
