import fs from 'fs';
import handlebars from 'handlebars';
import path from 'path';
import { inject, injectable } from 'tsyringe';

import { IMailProvider } from '@shared/container/providers/MailProvider/models/IMailProvider';

import { ISendForgotPasswordMailDTO } from '../dtos/ISendForgotPasswordMailDTO';

@injectable()
class SendForgotPasswordMailService {
  constructor(
    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ email, token }: ISendForgotPasswordMailDTO) {
    const template = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    const templateFileContent = fs.readFileSync(template).toString('utf-8');

    const templateParse = handlebars.compile(templateFileContent);

    const link = `${process.env.RESET_PASSWORD_URL}${token}`;

    const templateHTML = templateParse({ link });

    const message = {
      to: email,
      from: 'Template API <no-reply@template.com>',
      subject: 'Forgot Template API Password',
      html: templateHTML,
    };

    await this.mailProvider.sendMail(message);
  }
}

export { SendForgotPasswordMailService };
