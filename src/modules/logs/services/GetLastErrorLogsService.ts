import { inject, injectable } from 'tsyringe';

import IErrorLogsRepository from '../repositories/IErrorLogsRepository';

@injectable()
class GetLastErrorLogsService {
  constructor(
    @inject('ErrorLogsRepository')
    private errorLogsRepository: IErrorLogsRepository,
  ) {}

  public async execute(quantity: number) {
    const logs = await this.errorLogsRepository.getLast(quantity);

    return logs;
  }
}

export { GetLastErrorLogsService };
