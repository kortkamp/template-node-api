import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { IUsersRepository } from '../repositories/IUsersRepository';

interface IRequest {
  userId: string;
  authUserId: string;
}

@injectable()
class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  public async execute({ userId }: IRequest) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ErrorsApp('User not found', 404);
    }

    await this.usersRepository.delete(user);
  }
}

export { DeleteUserService };
