import { inject, injectable } from 'tsyringe';

import { ICreateErrorLogDTO } from '../dtos/ICreateErrorLogDTO';
import { IErrorLog } from '../models/IErrorLog';
import IErrorLogsRepository from '../repositories/IErrorLogsRepository';

@injectable()
class CreateErrorLogService {
  constructor(
    @inject('ErrorLogsRepository')
    private errorLogsRepository: IErrorLogsRepository,
  ) {}

  public async execute(data: ICreateErrorLogDTO): Promise<IErrorLog> {
    const errorLog = await this.errorLogsRepository.create(data);
    return errorLog;
  }
}

export { CreateErrorLogService };
