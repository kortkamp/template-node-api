import { FakeUserToken } from '@modules/users/models/fakes/FakeUserToken';
import { IUserToken } from '@modules/users/models/IUserToken';
import { IUserTokensRepository } from '@modules/users/repositories/IUserTokensRepository';

class FakeUserTokensRepository implements IUserTokensRepository {
  private userTokens: IUserToken[] = [];

  public async generate(user_id: string): Promise<IUserToken> {
    // Remove old tokens from this user first
    const newList = this.userTokens.filter(
      usrToken => usrToken.user_id !== user_id,
    );

    this.userTokens = newList;

    const userToken = new FakeUserToken({ user_id });

    this.userTokens.push(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<IUserToken | undefined> {
    const findUserToken = this.userTokens.find(
      userToken => userToken.token === token,
    );

    return findUserToken;
  }

  public async delete(token: string): Promise<void> {
    const listWithRemovedTokens = this.userTokens.filter(
      userToken => userToken.token !== token,
    );
    this.userTokens = listWithRemovedTokens;
  }
}

export default FakeUserTokensRepository;
