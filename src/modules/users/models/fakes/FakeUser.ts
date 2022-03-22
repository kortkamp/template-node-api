import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { v4 as uuid } from 'uuid';

import { IUser } from '../IUser';

class FakeUser implements IUser {
  id: string;

  name: string;

  email: string;

  active: boolean;

  password: string;

  created_at: Date;

  updated_at: Date;

  constructor(data: ICreateUserDTO) {
    this.id = uuid();

    Object.assign(this, data);

    this.created_at = new Date();
    this.updated_at = new Date();
  }
}

export { FakeUser };
