import { inject, injectable } from 'tsyringe';

import { IRolePermissionsRepository } from '../repositories/IRolePermissionsRepository';

@injectable()
class ListRolePermissionsService {
  constructor(
    @inject('RolePermissionsRepository')
    private rolePermissionsRepository: IRolePermissionsRepository,
  ) {}
  public async execute() {
    const rolePermissions = await this.rolePermissionsRepository.getAll();

    return rolePermissions;
  }
}

export { ListRolePermissionsService };
