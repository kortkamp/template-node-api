import { ISendMailDTO } from '@shared/container/providers/MailProvider/dto/ISendMailDTO';

interface ICreateMailErrorLogDTO {
  message: ISendMailDTO;
  error: Error;
}

export { ICreateMailErrorLogDTO };
