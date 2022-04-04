import { inject, injectable } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
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
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}
  public async execute({ userId }: IRequest) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ErrorsApp('User not found', 404);
    }

    if (user.avatar) {
      this.storageProvider.deleteFile({ file: user.avatar, type: 'avatar' });
    }

    await this.usersRepository.delete(user);
  }
}

export { DeleteUserService };
