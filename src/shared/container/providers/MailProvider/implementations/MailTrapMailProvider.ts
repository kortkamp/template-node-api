import { CreateMailErrorLogService } from '@modules/logs/services/CreateMailErrorLogService';
import nodemailer from 'nodemailer';
import { container } from 'tsyringe';

import { ISendMailDTO } from '../dto/ISendMailDTO';
import { IMailProvider } from '../models/IMailProvider';

class MailTrapMailProvider implements IMailProvider {
  private transportConfigs = {};

  constructor() {
    this.transportConfigs = {
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.MAIL_TRAP_USER,
        pass: process.env.MAIL_TRAP_PASS,
      },
    };
  }
  public async sendMail({ from, to, subject, html }: ISendMailDTO) {
    const transport = nodemailer.createTransport(this.transportConfigs);

    const message = {
      from,
      to,
      subject,
      html,
    };

    transport.sendMail(message, (err, info) => {
      if (err) {
        if (process.env.NODE_ENV === 'development') {
          console.log(err);
        }
        const createMailErrorService = container.resolve(
          CreateMailErrorLogService,
        );
        createMailErrorService.execute({ error: err, message });
      } else if (process.env.NODE_ENV === 'development') {
        console.log(info);
      }
    });
  }
}

export { MailTrapMailProvider };
