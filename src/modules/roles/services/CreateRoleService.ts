import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateRoleDTO } from '../dtos/ICreateRoleDTO';
import { IRolesRepository } from '../repositories/IRolesRepository';

@injectable()
class CreateRoleService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}

  public async execute(data: ICreateRoleDTO) {
    const roleExists = await this.rolesRepository.findByName(data.name);

    if (roleExists) {
      throw new ErrorsApp('Role already exists', 409);
    }

    const role = await this.rolesRepository.create(data);

    return role;
  }
}

export { CreateRoleService };
