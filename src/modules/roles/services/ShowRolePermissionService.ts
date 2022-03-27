import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { IRolePermissionsRepository } from '../repositories/IRolePermissionsRepository';

@injectable()
class ShowRolePermissionService {
  constructor(
    @inject('RolePermissionsRepository')
    private rolePermissionsRepository: IRolePermissionsRepository,
  ) {}
  public async execute(rolePermissionId: string) {
    const rolePermission = await this.rolePermissionsRepository.findById(
      rolePermissionId,
    );
    if (!rolePermission) {
      throw new ErrorsApp('Role permission does not exists', 404);
    }

    return rolePermission;
  }
}

export { ShowRolePermissionService };
