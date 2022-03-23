import { ICreateRoleDTO } from '@modules/roles/dtos/ICreateRoleDTO';
import { v4 as uuid } from 'uuid';

import { IRole } from '../IRole';

class FakeRole implements IRole {
  id: string;

  name: string;

  created_at: Date;

  updated_at: Date;

  constructor(data: ICreateRoleDTO) {
    this.id = uuid();

    Object.assign(this, data);

    this.created_at = new Date();
    this.updated_at = new Date();
  }
}

export { FakeRole };
