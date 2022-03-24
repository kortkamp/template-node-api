import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateRoleDTO } from '../dtos/ICreateRoleDTO';
import { IRolesRepository } from '../repositories/IRolesRepository';

interface IRequest {
  roleId: string;
  data: Partial<ICreateRoleDTO>;
}

@injectable()
class UpdateRoleService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}
  public async execute({ roleId, data }: IRequest) {
    const role = await this.rolesRepository.findById(roleId);

    if (!role) {
      throw new ErrorsApp('Role not found', 404);
    }

    if (data.name && data.name !== role.name) {
      const roleExists = await this.rolesRepository.findByName(data.name);

      if (roleExists) {
        throw new ErrorsApp('Role name already exists', 409);
      }
    }

    Object.assign(role, data);

    await this.rolesRepository.save(role);

    return role;
  }
}

export { UpdateRoleService };
