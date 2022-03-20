import { inject, injectable } from 'tsyringe';

import { ICreateMailErrorLogDTO } from '../dtos/ICreateMailErrorLogDTO';
import { IMailErrorLog } from '../models/IMailErrorLog';
import IMailErrorLogsRepository from '../repositories/IMailErrorLogsRepository';

@injectable()
class CreateMailErrorLogService {
  constructor(
    @inject('MailErrorLogsRepository')
    private mailErrorLogsRepository: IMailErrorLogsRepository,
  ) {}

  public async execute(data: ICreateMailErrorLogDTO): Promise<IMailErrorLog> {
    const mailErrorLog = await this.mailErrorLogsRepository.create(data);
    return mailErrorLog;
  }
}

export { CreateMailErrorLogService };
