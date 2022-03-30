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
      await this.storageProvider.deleteFile(user.avatar, 'avatar');
    }

    const fileExtension = tmpFileName.split('.').slice(-1);
    const fileName = `${user_id}.${fileExtension}`;

    const filename = await this.storageProvider.saveFile(
      tmpFileName,
      fileName,
      'avatar',
    );

    user.avatar = filename;

    await this.usersRepository.save(user);

    return filename;
  }
}
export { UpdateUserAvatarService };
