import { SendConfirmationMailService } from '@modules/mails/services/SendConfirmationMailService';
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { injectable, inject } from 'tsyringe';

import { IHashProvider } from '@shared/container/HashProvider/models/IHashProvider';
import { IMailProvider } from '@shared/container/providers/MailProvider/models/IMailProvider';
import ErrorsApp from '@shared/errors/ErrorsApp';

import { IUser } from '../models/IUser';
import { IUsersRepository } from '../repositories/IUsersRepository';
import { IUserTokensRepository } from '../repositories/IUserTokensRepository';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute(data: ICreateUserDTO): Promise<IUser> {
    const emailExists = await this.usersRepository.findByEmail(data.email);

    if (emailExists) {
      throw new ErrorsApp('Email already registered!.', 409);
    }

    const hashedPassword = await this.hashProvider.create(data.password, 8);

    Object.assign(data, { password: hashedPassword, active: false });

    const user = await this.usersRepository.create(data);

    const userToken = await this.userTokensRepository.generate(user.id);

    const sendConfirmationMail = new SendConfirmationMailService(
      this.mailProvider,
    );

    await sendConfirmationMail.execute({
      email: data.email,
      user: user.name,
      token: userToken.token,
    });

    return user;
  }
}

export { CreateUserService };
