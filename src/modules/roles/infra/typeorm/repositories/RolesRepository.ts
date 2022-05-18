import { ICreateRoleDTO } from '@modules/roles/dtos/ICreateRoleDTO';
import { IRolesRepository } from '@modules/roles/repositories/IRolesRepository';
import { Repository } from 'typeorm';

import { AppDataSource } from '@shared/infra/typeorm';

import { Role } from '../models/Role';

class RolesRepository implements IRolesRepository {
  private ormRepository: Repository<Role>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository<Role>(Role);
  }

  public async getTotal(): Promise<number> {
    const result = await this.ormRepository.query(
      'SELECT count(roles.id) as total FROM roles ',
    );

    return result[0].total;
  }

  public async create(data: ICreateRoleDTO): Promise<Role> {
    const newRole = this.ormRepository.create(data);

    await this.ormRepository.save(newRole);

    return newRole;
  }

  public async getAll(relations: string[] = []): Promise<Role[]> {
    return this.ormRepository.find({ relations });
  }

  public async save(data: Role): Promise<void> {
    await this.ormRepository.save(data);
  }

  public async findById(
    id: string,
    relations?: string[],
  ): Promise<Role | undefined> {
    const role = await this.ormRepository.findOne({
      where: { id },
      relations,
    });

    return role;
  }

  public async findByName(name: string): Promise<Role | undefined> {
    const role = await this.ormRepository.findOne({
      where: { name },
    });

    return role;
  }

  public async delete(role: Role): Promise<void> {
    await this.ormRepository.remove(role);
  }
}

export { RolesRepository };
