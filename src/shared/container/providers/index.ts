import { container } from 'tsyringe';

import { MailTrapMailProvider } from './MailProvider/implementations/MailTrapMailProvider';
import { SendGridMailProvider } from './MailProvider/implementations/SendGridMailProvider';
import { IMailProvider } from './MailProvider/models/IMailProvider';

const mailProvider = {
  MailTrap: MailTrapMailProvider,
  SendGrid: SendGridMailProvider,
};

container.registerSingleton<IMailProvider>(
  'MailProvider',
  mailProvider[process.env.MAIL_PROVIDER],
);
