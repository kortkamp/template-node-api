import { ICreateRawLogDTO } from '../dtos/ICreateRawLogDTO';
import { IRawLog } from '../models/IRawLog';

export default interface IRawLogsRepository {
  create(data: ICreateRawLogDTO): Promise<IRawLog>;
  save(user: IRawLog): Promise<IRawLog>;
}
