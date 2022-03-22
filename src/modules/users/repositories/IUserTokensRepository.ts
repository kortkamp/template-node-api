import { IUserToken } from '@modules/users/models/IUserToken';

interface IUserTokensRepository {
  generate(user_id: string): Promise<IUserToken>;
  findByToken(token: string): Promise<IUserToken | undefined>;
  delete(token: string): Promise<void>;
}

export { IUserTokensRepository };
