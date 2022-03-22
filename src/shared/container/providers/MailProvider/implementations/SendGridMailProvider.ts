import { CreateMailErrorLogService } from '@modules/logs/services/CreateMailErrorLogService';
import sgMail from '@sendgrid/mail';
import { container } from 'tsyringe';

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

    sgMail
      .send(message)
      .then(response => {
        if (process.env.NODE_ENV === 'development') {
          console.log(response[0].statusCode);
          console.log(response[0].headers);
        }
      })
      .catch(error => {
        if (process.env.NODE_ENV === 'development') {
          console.log(error);
        }
        const createMailErrorService = container.resolve(
          CreateMailErrorLogService,
        );
        createMailErrorService.execute({ error, message });
      });
  }
}

export { SendGridMailProvider };
