import { ICreateMailErrorLogDTO } from '../dtos/ICreateMailErrorLogDTO';
import { IMailErrorLog } from '../models/IMailErrorLog';

export default interface IMailErrorLogsRepository {
  create(data: ICreateMailErrorLogDTO): Promise<IMailErrorLog>;
  save(mailError: IMailErrorLog): Promise<IMailErrorLog>;
}
