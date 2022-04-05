import { ICreateRoleDTO } from '@modules/roles/dtos/ICreateRoleDTO';
import crypto from 'crypto';
import { v4 as uuid } from 'uuid';

import { IRole } from '../IRole';

class FakeRole implements IRole {
  id: string;

  name: string;

  created_at: Date;

  updated_at: Date;

  constructor(data?: ICreateRoleDTO) {
    this.id = uuid();

    const randomId = crypto.randomBytes(10).toString('hex');
    this.name = `role-${randomId}`;

    Object.assign(this, data);

    this.created_at = new Date();
    this.updated_at = new Date();
  }
}

export { FakeRole };
