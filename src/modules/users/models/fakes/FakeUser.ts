import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import crypto from 'crypto';
import { v4 as uuid } from 'uuid';

import { IUser } from '../IUser';

// this class generates a Fake User for test purposes
// ! Take care with password since it will not be hashed
// ! If someone add more user columns, just add then here
// and will not be necessary to change the user tests

class FakeUser implements IUser {
  id: string;

  name: string;

  role_id: string;

  email: string;

  active: boolean;

  avatar: string;

  password: string;

  created_at: Date;

  updated_at: Date;

  constructor(data?: Partial<ICreateUserDTO>) {
    this.id = uuid();

    // random data
    const randomId = crypto.randomBytes(10).toString('hex');
    this.name = `user-${randomId}`;
    this.email = `user-${randomId}@fake.com`;
    this.role_id = uuid();
    this.password = '123456';

    this.created_at = new Date();
    this.updated_at = new Date();
    Object.assign(this, data);
  }
}

export { FakeUser };
