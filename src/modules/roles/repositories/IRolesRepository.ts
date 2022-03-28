import { ICreateRoleDTO } from '../dtos/ICreateRoleDTO';
import { IRole } from '../models/IRole';

interface IRolesRepository {
  create(data: ICreateRoleDTO): Promise<IRole>;
  getAll(relations?: string[]): Promise<IRole[]>;
  findById(userId: string, relations?: string[]): Promise<IRole | undefined>;
  findByName(name: string): Promise<IRole | undefined>;
  save(dataUpdate: IRole): Promise<void>;
  delete(user: IRole): Promise<void>;
  getTotal(): Promise<number>;
}

export { IRolesRepository };
