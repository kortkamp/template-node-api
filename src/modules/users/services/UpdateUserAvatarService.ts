import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import ErrorsApp from '@shared/errors/ErrorsApp';

interface IRequest {
  user_id: string;
  tmpFileName: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}
  async execute({ user_id, tmpFileName }: IRequest): Promise<string> {
    const user = await this.usersRepository.findById(user_id);
    if (!user || !user_id) {
      throw new ErrorsApp('User not found', 404);
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile({
        file: user.avatar,
        type: 'avatar',
      });
    }

    const filename = await this.storageProvider.saveFile({
      tmpFile: tmpFileName,
      type: 'avatar',
    });

    user.avatar = filename;

    await this.usersRepository.save(user);

    return filename;
  }
}
export { UpdateUserAvatarService };
