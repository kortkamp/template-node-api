import 'reflect-metadata';
import { FakeMailProvider } from '@shared/container/providers/MailProvider/fake/FakeMailProvider';
import ErrorsApp from '@shared/errors/ErrorsApp';

import { FakeUser } from '../models/fakes/FakeUser';
import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import { ForgotPasswordService } from './ForgotPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let forgotPasswordService: ForgotPasswordService;

const userData = {
  email: 'johndoe@example.com',
  name: 'John Doe',
  password: '123456',
  role_id: '111111',
};

describe('ForgotPasswordService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    forgotPasswordService = new ForgotPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeMailProvider,
    );
  });

  it('should be able to recover the password using the email', async () => {
    await fakeUsersRepository.create(userData);

    const result = await forgotPasswordService.execute(userData.email);

    expect(result).toBeInstanceOf(FakeUser);
  });

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create(userData);

    await forgotPasswordService.execute(userData.email);

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });

  it('should send a email with token to recover password', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create(userData);

    await forgotPasswordService.execute(userData.email);

    expect(sendMail).toHaveBeenCalledWith(
      expect.objectContaining({ to: userData.email }),
    );
  });

  it('should not be able to recover a non-existing user password', async () => {
    await expect(
      forgotPasswordService.execute('johndoe@example.com'),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });
});
