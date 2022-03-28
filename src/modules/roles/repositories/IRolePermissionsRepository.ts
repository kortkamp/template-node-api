import { ICreateRolePermissionDTO } from '../dtos/ICreateRolePermissionDTO';
import { IRolePermission } from '../models/IRolePermission';

interface IRolePermissionsRepository {
  create(data: ICreateRolePermissionDTO): Promise<IRolePermission>;
  getAll(): Promise<IRolePermission[]>;
  findById(userId: string): Promise<IRolePermission | undefined>;
  findByRoleResource(
    resource: string,
    role_id: string,
  ): Promise<IRolePermission | undefined>;
  save(dataUpdate: IRolePermission): Promise<void>;
  delete(user: IRolePermission): Promise<void>;
}

export { IRolePermissionsRepository };
