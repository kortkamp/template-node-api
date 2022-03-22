import { v4 as uuid } from 'uuid';

import { IUserToken } from '../IUserToken';

class FakeUserToken implements IUserToken {
  id: string;
  token: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;

  constructor(
    data: Omit<FakeUserToken, 'id' | 'token' | 'created_at' | 'updated_at'>,
  ) {
    this.id = uuid();
    this.token = uuid();
    Object.assign(this, data);

    this.created_at = new Date();
    this.updated_at = new Date();
  }
}
export { FakeUserToken };
