import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { IUser } from '../models/IUser';
import { IUsersRepository } from '../repositories/IUsersRepository';

interface IRequest {
  userId: string;
  authUser: {
    id: string;
    role: string;
  };
}
@injectable()
class ShowUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  public async execute({ userId }: IRequest): Promise<IUser> {
    const user = await this.usersRepository.findById(userId, ['role']);

    if (!user) {
      throw new ErrorsApp('User not found', 404);
    }

    return user;
  }
}

export { ShowUserService };
