import 'reflect-metadata';
import { FakeHashProvider } from '@shared/container/HashProvider/fakes/FakeHashProvider';
import { FakeMailProvider } from '@shared/container/providers/MailProvider/fake/FakeMailProvider';
import { IMailProvider } from '@shared/container/providers/MailProvider/models/IMailProvider';
import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import { IUserTokensRepository } from '../repositories/IUserTokensRepository';
import { CreateUserService } from './CreateUserService';

let createUserService: CreateUserService;
let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: IMailProvider;
let fakeUserTokensRepository: IUserTokensRepository;

const userData: ICreateUserDTO = {
  email: 'jondoe@gmail.com',
  name: 'Jon Doe',
  password: '123',
  active: false,
};

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeMailProvider,
      fakeHashProvider,
    );
  });

  it('Should be able to create new user', async () => {
    const spySendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    const spyCreateUserToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const newUser = await createUserService.execute(userData);

    expect(newUser).toHaveProperty('id');

    expect(newUser?.name).toBe(userData.name);

    expect(spySendMail).toBeCalledTimes(1);
    expect(spyCreateUserToken).toBeCalledTimes(1);
  });

  it('Should create new user inactive', async () => {
    const newUser = await createUserService.execute(userData);

    expect(newUser).toHaveProperty('id');

    expect(newUser?.active).toBe(false);
  });

  it('Should not be able to create user if email already in use', async () => {
    await createUserService.execute(userData);

    await expect(createUserService.execute(userData)).rejects.toEqual(
      new ErrorsApp('Email already registered', 409),
    );
  });
});