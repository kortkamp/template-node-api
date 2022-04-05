import { authConfig } from '@config/auth';
import { IRolesRepository } from '@modules/roles/repositories/IRolesRepository';
import { IUser } from '@modules/users/models/IUser';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { IHashProvider } from '@shared/container/providers/HashProvider/models/IHashProvider';
import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateSessionDTO } from '../dtos/ICreateSessionDTO';

interface IResponse {
  user: IUser;
  token: string;
}
@injectable()
class CreateSessionService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    email,
    password,
  }: ICreateSessionDTO): Promise<IResponse> {
    const userExists = await this.usersRepository.findByEmail(email);

    if (!userExists) {
      throw new ErrorsApp('Invalid email/password combination', 403);
    }

    const role = await this.rolesRepository.findById(userExists.role_id);

    if (!role) {
      throw new ErrorsApp('Role does not exists', 403);
    }

    const checkPasswordMatch = await this.hashProvider.verify(
      userExists.password,
      password,
    );

    if (!checkPasswordMatch) {
      throw new ErrorsApp('Invalid email/password combination', 403);
    }

    if (!userExists.active) {
      throw new ErrorsApp('User not active, please contact admin', 403);
    }

    const token = sign({ role: role.name }, authConfig.jwt.secret, {
      subject: userExists.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      user: userExists,
      token,
    };
  }
}

export { CreateSessionService };
