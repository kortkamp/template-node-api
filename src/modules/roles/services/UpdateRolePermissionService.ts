import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateRolePermissionDTO } from '../dtos/ICreateRolePermissionDTO';
import { IRolePermissionsRepository } from '../repositories/IRolePermissionsRepository';

interface IRequest {
  rolePermissionId: string;
  data: Partial<ICreateRolePermissionDTO>;
}

@injectable()
class UpdateRolePermissionService {
  constructor(
    @inject('RolePermissionsRepository')
    private rolePermissionsRepository: IRolePermissionsRepository,
  ) {}
  public async execute({ rolePermissionId, data }: IRequest) {
    const rolePermission = await this.rolePermissionsRepository.findById(
      rolePermissionId,
    );

    if (!rolePermission) {
      throw new ErrorsApp('RolePermission not found', 404);
    }

    if (data.resource && data.resource !== rolePermission.resource) {
      const rolePermissionExists =
        await this.rolePermissionsRepository.findByResource(data.resource);

      if (rolePermissionExists) {
        throw new ErrorsApp(
          'RolePermission already exists for that resource',
          409,
        );
      }
    }

    Object.assign(rolePermission, data);

    await this.rolePermissionsRepository.save(rolePermission);

    return rolePermission;
  }
}

export { UpdateRolePermissionService };
