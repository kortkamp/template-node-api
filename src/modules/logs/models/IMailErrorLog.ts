import { ISendMailDTO } from '@shared/container/providers/MailProvider/dto/ISendMailDTO';

interface IMailErrorLog {
  id: string;
  message: ISendMailDTO;
  error: Error;
  createdAt: Date;
}

export { IMailErrorLog };
