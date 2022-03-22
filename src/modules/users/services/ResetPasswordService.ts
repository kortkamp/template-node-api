import { isAfter, addHours } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import { IHashProvider } from '@shared/container/HashProvider/models/IHashProvider';
import ErrorsApp from '@shared/errors/ErrorsApp';

import { IUsersRepository } from '../repositories/IUsersRepository';
import { IUserTokensRepository } from '../repositories/IUserTokensRepository';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ token, password }: IRequest) {
    const foundToken = await this.userTokensRepository.findByToken(token);

    if (!foundToken) {
      throw new ErrorsApp('Token not found', 403);
    }

    const tokenExpiration = addHours(
      foundToken.created_at,
      Number(process.env.TOKEN_EXPIRES_IN) || 24,
    );

    if (isAfter(Date.now(), tokenExpiration)) {
      throw new ErrorsApp('Token expired', 403);
    }

    const user = await this.usersRepository.findById(foundToken.user_id);

    const hashedPassword = await this.hashProvider.create(password, 8);

    Object.assign(user, { password: hashedPassword });

    await this.usersRepository.save(user);

    await this.userTokensRepository.delete(foundToken.id);
  }
}

export { ResetPasswordService };
