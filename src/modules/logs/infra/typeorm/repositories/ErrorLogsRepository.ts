import { ICreateErrorLogDTO } from '@modules/logs/dtos/ICreateErrorLogDTO';
import IErrorLogsRepository from '@modules/logs/repositories/IErrorLogsRepository';
import { getMongoRepository, MongoRepository } from 'typeorm';

import ErrorLog from '../schemas/ErrorLog';

class ErrorLogsRepository implements IErrorLogsRepository {
  private ormRepository: MongoRepository<ErrorLog>;

  constructor() {
    this.ormRepository = getMongoRepository(ErrorLog, 'mongo');
  }

  public async getById(id: string): Promise<ErrorLog | undefined> {
    const log = await this.ormRepository.findOne(id);

    return log;
  }

  public async list(): Promise<ErrorLog[]> {
    const logs = await this.ormRepository.find();

    return logs;
  }

  public async getLast(quantity: number): Promise<ErrorLog[]> {
    const logs = await this.ormRepository.find({
      order: { createdAt: 'DESC' },
      take: quantity,
    });

    return logs;
  }

  public async create(data: ICreateErrorLogDTO): Promise<ErrorLog> {
    const log = this.ormRepository.create(data);

    await this.ormRepository.save(log);

    return log;
  }

  public async save(log: ErrorLog): Promise<ErrorLog> {
    return this.ormRepository.save(log);
  }
}

export default ErrorLogsRepository;
