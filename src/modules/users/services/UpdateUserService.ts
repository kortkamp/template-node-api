import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { injectable, inject } from 'tsyringe';

import { IHashProvider } from '@shared/container/providers/HashProvider/models/IHashProvider';
import ErrorsApp from '@shared/errors/ErrorsApp';

import { IUser } from '../models/IUser';
import { IUsersRepository } from '../repositories/IUsersRepository';

interface IUpdateUserData extends Partial<ICreateUserDTO> {
  old_password?: string;
}

interface IRequest {
  userId: string;
  authUserId: string;
  data: IUpdateUserData;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ userId, authUserId, data }: IRequest): Promise<IUser> {
    if (authUserId !== userId) {
      throw new ErrorsApp('User not authorized', 403);
    }

    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ErrorsApp('User not found', 404);
    }

    if (data.email && data.email !== user.email) {
      const emailExists = await this.usersRepository.findByEmail(data.email);

      if (emailExists) {
        throw new ErrorsApp('Email already registered!.', 409);
      }
    }

    if (data.password) {
      const checkOldPasswordMatch = await this.hashProvider.verify(
        user.password,
        data.old_password,
      );

      if (!checkOldPasswordMatch) {
        throw new ErrorsApp('Old password does not match', 401);
      }

      const hashedPassword = await this.hashProvider.create(data.password, 8);

      Object.assign(data, { password: hashedPassword });
    }

    Object.assign(user, data);

    await this.usersRepository.save(user);

    return user;
  }
}

export { UpdateUserService };
