import { ISendMailDTO } from '../dto/ISendMailDTO';

interface IMailProvider {
  sendMail(data: ISendMailDTO): Promise<void>;
}

export { IMailProvider };
