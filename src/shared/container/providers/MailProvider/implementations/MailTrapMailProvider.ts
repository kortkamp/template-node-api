import nodemailer from 'nodemailer';

import { IMailProvider, ISendMailDTO } from '../models/IMailProvider';

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
  public async sendMail({ from, to, subject, text }: ISendMailDTO) {
    const transport = nodemailer.createTransport(this.transportConfigs);

    const message = {
      from,
      to,
      subject,
      text,
    };

    transport.sendMail(message, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    });
  }
}

export { MailTrapMailProvider };
