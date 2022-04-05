import path from 'path';
import { injectable, inject } from 'tsyringe';

import { IMailProvider } from '@shared/container/providers/MailProvider/models/IMailProvider';
import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
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

    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {}

  public async execute(email: string): Promise<IUser> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new ErrorsApp('Email not found!.', 404);
    }

    const userToken = await this.userTokensRepository.generate(user.id);

    const templateFile = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    const link = `${process.env.RESET_PASSWORD_URL}${userToken.token}`;

    const templateHTML = await this.mailTemplateProvider.parse({
      file: templateFile,
      variables: { link },
    });

    const message = {
      to: email,
      from: 'Template API <no-reply@template.com>',
      subject: 'Forgot Template API Password',
      html: templateHTML,
    };

    await this.mailProvider.sendMail(message);

    return user;
  }
}

export { ForgotPasswordService };
