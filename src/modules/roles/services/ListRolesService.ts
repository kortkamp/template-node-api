import { inject, injectable } from 'tsyringe';

import { IRolesRepository } from '../repositories/IRolesRepository';

@injectable()
class ListRolesService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}
  public async execute() {
    const roles = await this.rolesRepository.getAll();

    return roles;
  }
}

export { ListRolesService };
