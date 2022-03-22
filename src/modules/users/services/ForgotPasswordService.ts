import { SendForgotPasswordMailService } from '@modules/mails/services/SendForgotPasswordMailService';
import { injectable, inject } from 'tsyringe';

import { IMailProvider } from '@shared/container/providers/MailProvider/models/IMailProvider';
import ErrorsApp from '@shared/errors/ErrorsApp';

import { IUser } from '../models/IUser';
import { IUsersRepository } from '../repositories/IUsersRepository';
import { IUserTokensRepository } from '../repositories/IUserTokensRepository';

@injectable()
class ForgotPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute(email: string): Promise<IUser> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new ErrorsApp('Email not found!.', 404);
    }

    const userToken = await this.userTokensRepository.generate(user.id);

    const sendForgotPasswordMailService = new SendForgotPasswordMailService(
      this.mailProvider,
    );

    await sendForgotPasswordMailService.execute({
      email,
      token: userToken.token,
    });

    return user;
  }
}

export { ForgotPasswordService };
