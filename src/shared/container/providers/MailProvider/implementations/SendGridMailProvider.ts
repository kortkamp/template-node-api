import sgMail from '@sendgrid/mail';

import { IMailProvider, ISendMailDTO } from '../models/IMailProvider';

class SendGridMailProvider implements IMailProvider {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }
  public async sendMail({ from, to, subject, text }: ISendMailDTO) {
    const email = {
      to,
      from,
      subject,
      text,
    };

    sgMail
      .send(email)
      .then(response => {
        console.log(response[0].statusCode);
        console.log(response[0].headers);
      })
      .catch(error => {
        console.error(error);
      });
  }
}

export { SendGridMailProvider };
