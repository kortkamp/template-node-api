import sgMail from '@sendgrid/mail';

import { logger } from '@shared/utils/logger';

import { ISendMailDTO } from '../dtos/ISendMailDTO';
import { IMailProvider } from '../models/IMailProvider';

class SendGridMailProvider implements IMailProvider {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }
  public async sendMail({ from, to, subject, html }: ISendMailDTO) {
    const message = {
      to,
      from,
      subject,
      html,
    };

    try {
      const info = await sgMail.send(message);
      logger.debug(info);
    } catch (err) {
      logger.error('Sendgrid', err);
    }
  }
}

export { SendGridMailProvider };
