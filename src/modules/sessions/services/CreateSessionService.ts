import { authConfig } from '@config/auth';
import { IUser } from '@modules/users/models/IUser';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { IHashProvider } from '@shared/container/HashProvider/models/IHashProvider';
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

    const checkPasswordMatch = await this.hashProvider.verify(
      userExists.password,
      password,
    );

    if (!checkPasswordMatch) {
      throw new ErrorsApp('Invalid email/password combination', 403);
    }

    const token = sign({}, authConfig.jwt.secret, {
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
