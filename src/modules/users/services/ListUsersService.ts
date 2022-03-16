import { injectable, inject } from 'tsyringe';

import { IUser } from '../models/IUser';
import { IUsersRepository } from '../repositories/IUsersRepository';

@injectable()
class ListUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(): Promise<IUser[]> {
    const users = await this.usersRepository.getAll();

    return users;
  }
}

export { ListUsersService };
