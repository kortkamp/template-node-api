import nodemailer from 'nodemailer';
import { container } from 'tsyringe';

import { logger } from '@shared/utils/logger';

import { ISendMailDTO } from '../dtos/ISendMailDTO';
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
        logger.error(err);
      } else {
        logger.debug(info);
      }
    });
  }
}

export { MailTrapMailProvider };
