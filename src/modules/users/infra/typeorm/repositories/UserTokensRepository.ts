import { UserToken } from '@modules/users/infra/typeorm/models/UserToken';
import { IUserTokensRepository } from '@modules/users/repositories/IUserTokensRepository';
import { getRepository, Repository } from 'typeorm';

class UserTokensRepository implements IUserTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async generate(user_id: string): Promise<UserToken> {
    // Remove all old tokens from this users first
    const oldTokens = await this.ormRepository.find({ where: { user_id } });
    await this.ormRepository.remove(oldTokens);

    // Create a new token
    const userToken = this.ormRepository.create({
      user_id,
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userTokenFound = await this.ormRepository.findOne({
      where: { token },
    });

    return userTokenFound;
  }

  public async delete(token: string): Promise<void> {
    const userToken = await this.ormRepository.findOne({ where: { token } });
    if (userToken) {
      await this.ormRepository.remove(userToken);
    }
  }
}

export { UserTokensRepository };
