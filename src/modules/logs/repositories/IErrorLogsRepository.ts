import { ICreateErrorLogDTO } from '../dtos/ICreateErrorLogDTO';
import { IErrorLog } from '../models/IErrorLog';

export default interface IErrorLogsRepository {
  getById(id: string): Promise<IErrorLog | undefined>;
  list(): Promise<IErrorLog[]>;
  getLast(quantity: number): Promise<IErrorLog[]>;
  create(data: ICreateErrorLogDTO): Promise<IErrorLog>;
  save(user: IErrorLog): Promise<IErrorLog>;
}
