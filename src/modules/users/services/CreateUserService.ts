import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import path from 'path';
import { injectable, inject } from 'tsyringe';

import { IHashProvider } from '@shared/container/providers/HashProvider/models/IHashProvider';
import { IMailProvider } from '@shared/container/providers/MailProvider/models/IMailProvider';
import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
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

    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute(data: ICreateUserDTO): Promise<IUser> {
    const emailExists = await this.usersRepository.findByEmail(data.email);

    if (emailExists) {
      throw new ErrorsApp('Email already registered', 409);
    }

    const hashedPassword = await this.hashProvider.create(data.password, 8);

    Object.assign(data, { password: hashedPassword, active: false });

    const user = await this.usersRepository.create(data);

    const userToken = await this.userTokensRepository.generate(user.id);

    const templateFile = path.resolve(
      __dirname,
      '..',
      'views',
      'confirm_user.hbs',
    );

    const link = `${process.env.CONFIRM_USER_URL}${userToken.token}`;

    const templateHTML = await this.mailTemplateProvider.parse({
      file: templateFile,
      variables: { name: user.name, link },
    });

    const message = {
      to: user.email,
      from: 'Template API <no-reply@template.com>',
      subject: 'Signup in Template API Confirmation',
      html: templateHTML,
    };

    await this.mailProvider.sendMail(message);

    return user;
  }
}

export { CreateUserService };
