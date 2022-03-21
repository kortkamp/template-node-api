import fs from 'fs';
import handlebars from 'handlebars';
import path from 'path';
import { inject, injectable } from 'tsyringe';

import { IMailProvider } from '@shared/container/providers/MailProvider/models/IMailProvider';

import { ISendConfirmationMailDTO } from '../dtos/ISendConfirmationMailDTO';

@injectable()
class SendConfirmationMailService {
  constructor(
    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ email, user, token }: ISendConfirmationMailDTO) {
    const template = path.resolve(__dirname, '..', 'views', 'confirm_user.hbs');

    const templateFileContent = fs.readFileSync(template).toString('utf-8');

    const templateParse = handlebars.compile(templateFileContent);

    const link = `${process.env.CONFIRM_USER_URL}${token}`;

    const templateHTML = templateParse({ name: user, link });

    const message = {
      to: email,
      from: 'Template API <no-reply@template.com>',
      subject: 'Signup in Template API Confirmation',
      html: templateHTML,
    };

    await this.mailProvider.sendMail(message);
  }
}

export { SendConfirmationMailService };
