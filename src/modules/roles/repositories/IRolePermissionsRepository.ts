import { ICreateRolePermissionDTO } from '../dtos/ICreateRolePermissionDTO';
import { IRolePermission } from '../models/IRolePermission';

interface IRolePermissionsRepository {
  create(data: ICreateRolePermissionDTO): Promise<IRolePermission>;
  getAll(): Promise<IRolePermission[]>;
  findById(userId: string): Promise<IRolePermission | undefined>;
  findByResource(resource: string): Promise<IRolePermission | undefined>;
  save(dataUpdate: IRolePermission): Promise<void>;
  delete(user: IRolePermission): Promise<void>;
}

export { IRolePermissionsRepository };
