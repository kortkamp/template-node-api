import 'reflect-metadata';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';
import { ResetPasswordService } from '@modules/users/services/ResetPasswordService';

import { FakeHashProvider } from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';
import ErrorsApp from '@shared/errors/ErrorsApp';

import { FakeUser } from '../models/fakes/FakeUser';
import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPassword: ResetPasswordService;

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );
  });

  it('Should be able to reset the password', async () => {
    const user = await fakeUsersRepository.create(new FakeUser());

    const { token } = await fakeUserTokensRepository.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'create');

    await resetPassword.execute({ token, password: '654321' });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(updatedUser).toHaveProperty('password', '654321');
    expect(generateHash).toBeCalledWith('654321', 8);
  });

  it('Should not be able reset password with non-existent token', async () => {
    await expect(
      resetPassword.execute({ token: 'I do not exist!', password: '123456' }),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });

  it('Should not be able reset password with non-existent user', async () => {
    const { token } = await fakeUserTokensRepository.generate(
      'User does not exists',
    );

    await expect(
      resetPassword.execute({ token, password: '123456' }),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });

  it('Should not be able to reset password if passed more than 2 hours', async () => {
    const user = await fakeUsersRepository.create(new FakeUser());

    const { token } = await fakeUserTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();
      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPassword.execute({ token, password: '654321' }),
    ).rejects.toMatchObject({ statusCode: 401 });
  });
});
