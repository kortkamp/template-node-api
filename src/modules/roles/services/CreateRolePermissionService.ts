import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateRolePermissionDTO } from '../dtos/ICreateRolePermissionDTO';
import { IRolePermissionsRepository } from '../repositories/IRolePermissionsRepository';

@injectable()
class CreateRolePermissionService {
  constructor(
    @inject('RolePermissionsRepository')
    private rolePermissionsRepository: IRolePermissionsRepository,
  ) {}

  public async execute(data: ICreateRolePermissionDTO) {
    const rolePermissionExists =
      await this.rolePermissionsRepository.findByResource(data.resource);

    if (rolePermissionExists) {
      throw new ErrorsApp(
        'Role Permission for that resource already exists',
        409,
      );
    }

    const rolePermission = await this.rolePermissionsRepository.create(data);

    return rolePermission;
  }
}

export { CreateRolePermissionService };
