import { isAfter, addHours } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { IUsersRepository } from '../repositories/IUsersRepository';
import { IUserTokensRepository } from '../repositories/IUserTokensRepository';

@injectable()
class ConfirmUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute(tokenId: string) {
    const foundToken = await this.userTokensRepository.findByToken(tokenId);

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

    if (!user) {
      throw new ErrorsApp('User not found', 404);
    }

    user.active = true;

    await this.usersRepository.save(user);

    await this.userTokensRepository.delete(foundToken.token);
  }
}

export { ConfirmUserService };
