import 'reflect-metadata';
import ErrorsApp from '@shared/errors/ErrorsApp';

import { FakeUser } from '../models/fakes/FakeUser';
import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import { ConfirmUserService } from './ConfirmUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let confirmUser: ConfirmUserService;

describe('ConfirmUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    confirmUser = new ConfirmUserService(
      fakeUsersRepository,
      fakeUserTokensRepository,
    );
  });

  it('should be able to confirm user', async () => {
    const user = await fakeUsersRepository.create(new FakeUser());

    const { token } = await fakeUserTokensRepository.generate(user.id);

    await confirmUser.execute(token);

    const confirmedUser = await fakeUsersRepository.findById(user.id);

    expect(confirmedUser?.active).toBe(true);
  });

  it('should not be able to confirm user with nonexistent token', async () => {
    await expect(
      confirmUser.execute('non-existent-token'),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });

  it('should not be able to confirm user with nonexistent user', async () => {
    const { token } = await fakeUserTokensRepository.generate(
      'non-existent-user',
    );

    await expect(confirmUser.execute(token)).rejects.toBeInstanceOf(ErrorsApp);
  });

  it('should not be able to activate user if passed more than 24 hours', async () => {
    const user = await fakeUsersRepository.create(new FakeUser());

    const { token } = await fakeUserTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 25);
    });

    await expect(confirmUser.execute(token)).rejects.toBeInstanceOf(ErrorsApp);
  });
});
