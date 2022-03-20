import { ICreateMailErrorLogDTO } from '@modules/logs/dtos/ICreateMailErrorLogDTO';
import IMailErrorLogsRepository from '@modules/logs/repositories/IMailErrorLogsRepository';
import { getMongoRepository, MongoRepository } from 'typeorm';

import MailErrorLog from '../schemas/MailErrorLog';

class MailErrorLogsRepository implements IMailErrorLogsRepository {
  private ormRepository: MongoRepository<MailErrorLog>;

  constructor() {
    this.ormRepository = getMongoRepository(MailErrorLog, 'mongo');
  }

  public async create(data: ICreateMailErrorLogDTO): Promise<MailErrorLog> {
    const mailErrorLog = this.ormRepository.create(data);

    await this.ormRepository.save(mailErrorLog);

    return mailErrorLog;
  }

  public async save(mailErrorLog: MailErrorLog): Promise<MailErrorLog> {
    return this.ormRepository.save(mailErrorLog);
  }
}

export default MailErrorLogsRepository;
