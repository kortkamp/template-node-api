import { ICreateRolePermissionDTO } from '@modules/roles/dtos/ICreateRolePermissionDTO';
import { IRolePermissionsRepository } from '@modules/roles/repositories/IRolePermissionsRepository';
import { getRepository, Repository } from 'typeorm';

import { RolePermission } from '../models/RolePermission';

class RolePermissionsRepository implements IRolePermissionsRepository {
  private ormRepository: Repository<RolePermission>;

  constructor() {
    this.ormRepository = getRepository<RolePermission>(RolePermission);
  }

  public async create(data: ICreateRolePermissionDTO): Promise<RolePermission> {
    const rolePermission = this.ormRepository.create(data);

    await this.ormRepository.save(rolePermission);

    return rolePermission;
  }

  public async getAll(): Promise<RolePermission[]> {
    return this.ormRepository.find();
  }

  public async save(data: RolePermission): Promise<void> {
    await this.ormRepository.save(data);
  }

  public async findById(id: string): Promise<RolePermission | undefined> {
    const rolePermission = await this.ormRepository.findOne({
      where: { id },
    });

    return rolePermission;
  }

  public async findByResource(
    resource: string,
  ): Promise<RolePermission | undefined> {
    const rolePermission = await this.ormRepository.findOne({
      where: { resource },
    });

    return rolePermission;
  }

  public async delete(rolePermission: RolePermission): Promise<void> {
    await this.ormRepository.delete(rolePermission);
  }
}

export { RolePermissionsRepository };
