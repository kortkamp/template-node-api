import { ICreateRolePermissionDTO } from '@modules/roles/dtos/ICreateRolePermissionDTO';
import { FakeRolePermission } from '@modules/roles/models/fakes/FakeRolePermission';
import { IRolePermission } from '@modules/roles/models/IRolePermission';
import { IRolePermissionsRepository } from '@modules/roles/repositories/IRolePermissionsRepository';

class FakeRolePermissionsRepository implements IRolePermissionsRepository {
  private rolePermissions: IRolePermission[] = [];

  public async findById(user_id: string): Promise<IRolePermission | undefined> {
    const findUser = this.rolePermissions.find(user => user.id === user_id);

    return findUser;
  }

  public async findByRoleResource(
    resource: string,
  ): Promise<IRolePermission | undefined> {
    const rolePermission = this.rolePermissions.find(
      item => item.resource === resource,
    );

    return rolePermission;
  }

  public async create(
    data: ICreateRolePermissionDTO,
  ): Promise<IRolePermission> {
    const RolePermission = new FakeRolePermission(data);
    this.rolePermissions.push(RolePermission);
    return RolePermission;
  }

  public async getAll(): Promise<IRolePermission[]> {
    return this.rolePermissions;
  }

  public async getTotal(): Promise<number> {
    return this.rolePermissions.length;
  }

  public async save(data: IRolePermission): Promise<void> {
    const searchUser = this.rolePermissions.findIndex(
      user => user.id === data.id,
    );

    if (searchUser >= 0) {
      Object.assign(this.rolePermissions[searchUser], data);
    }
  }

  public async delete(user: IRolePermission): Promise<void> {
    const listWithRemovedUsers = this.rolePermissions.filter(
      item => item.id !== user.id,
    );
    this.rolePermissions = listWithRemovedUsers;
  }
}

export default FakeRolePermissionsRepository;
