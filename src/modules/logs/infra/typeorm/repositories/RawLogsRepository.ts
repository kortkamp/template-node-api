import { ICreateRawLogDTO } from '@modules/logs/dtos/ICreateRawLogDTO';
import IRawLogsRepository from '@modules/logs/repositories/IRawLogsRepository';
import { getMongoRepository, MongoRepository } from 'typeorm';

import RawLog from '../schemas/RawLog';

class RawLogsRepository implements IRawLogsRepository {
  private ormRepository: MongoRepository<RawLog>;

  constructor() {
    this.ormRepository = getMongoRepository(RawLog, 'mongo');
  }

  public async create(data: ICreateRawLogDTO): Promise<RawLog> {
    const rawLog = this.ormRepository.create(data);

    await this.ormRepository.save(rawLog);

    return rawLog;
  }

  public async save(rawLog: RawLog): Promise<RawLog> {
    return this.ormRepository.save(rawLog);
  }
}

export default RawLogsRepository;
