import { inject, injectable } from 'tsyringe';

import { ICreateRawLogDTO } from '../dtos/ICreateRawLogDTO';
import { IRawLog } from '../models/IRawLog';
import IRawLogsRepository from '../repositories/IRawLogsRepository';

@injectable()
class CreateRawLogService {
  constructor(
    @inject('RawLogsRepository')
    private rawLogsRepository: IRawLogsRepository,
  ) {}

  public async execute(data: ICreateRawLogDTO): Promise<IRawLog> {
    const log = await this.rawLogsRepository.create(data);
    return log;
  }
}

export { CreateRawLogService };
