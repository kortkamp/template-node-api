import 'reflect-metadata';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUserRepository';

import { FakeHashProvider } from '@shared/container/HashProvider/fakes/FakeHashProvider';
import ErrorsApp from '@shared/errors/ErrorsApp';

import { CreateSessionService } from './CreateSessionService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let createSessionService: CreateSessionService;

describe('CreateSessionService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createSessionService = new CreateSessionService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('Should be able to create a session', async () => {
    const user = await fakeUsersRepository.create({
      email: 'jondoe@gmail.com',
      name: 'Jon Doe',
      password: '123',
    });

    // activate user
    user.active = true;
    await fakeUsersRepository.save(user);

    const session = await createSessionService.execute({
      email: 'jondoe@gmail.com',
      password: '123',
    });

    expect(session).toHaveProperty('token');
    expect(session).toHaveProperty('user');

    expect(session?.user?.id).toBe(user.id);
  });

  it('Should return an error when email or password is incorrect from login', async () => {
    fakeUsersRepository.create({
      email: 'jondoe@gmail.com',
      name: 'Jon Doe',
      password: '123',
    });

    await expect(
      createSessionService.execute({
        email: 'jon@gmail.com',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(ErrorsApp);

    await expect(
      createSessionService.execute({
        email: 'jondoe@gmail.com',
        password: '123465',
      }),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });

  it('Should not be able to login if account is inactive', async () => {
    const user = await fakeUsersRepository.create({
      email: 'jondoe@gmail.com',
      name: 'Jon Doe',
      password: '123',
    });

    user.active = false;

    await fakeUsersRepository.save(user);

    await expect(
      createSessionService.execute({
        email: 'jondoe@gmail.com',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });
});
