import { ICreateRolePermissionDTO } from '@modules/roles/dtos/ICreateRolePermissionDTO';
import { v4 as uuid } from 'uuid';

import { IRolePermission } from '../IRolePermission';

class FakeRolePermission implements IRolePermission {
  id: string;

  resource: string;

  role_id: string;

  list: boolean;

  create: boolean;

  read: boolean;

  update: boolean;

  delete: boolean;

  created_at: Date;

  updated_at: Date;

  constructor(data: ICreateRolePermissionDTO) {
    this.id = uuid();

    Object.assign(this, data);

    this.created_at = new Date();
    this.updated_at = new Date();
  }
}

export { FakeRolePermission };
