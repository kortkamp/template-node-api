import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { IUser } from '../models/IUser';
import { IUsersRepository } from '../repositories/IUsersRepository';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(data: ICreateUserDTO): Promise<IUser> {
    const emailExists = await this.usersRepository.findByEmail(data.email);

    if (emailExists) {
      throw new ErrorsApp('Email already registered!.', 409);
    }

    const hashedPassword = await hash(data.password, 8);

    Object.assign(data, { password: hashedPassword });

    const user = await this.usersRepository.create(data);

    return user;
  }
}

export { CreateUserService };
