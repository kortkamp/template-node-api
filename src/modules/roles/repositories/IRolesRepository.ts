import { ICreateRoleDTO } from '../dtos/ICreateRoleDTO';
import { IRole } from '../models/IRole';

interface IRolesRepository {
  create(data: ICreateRoleDTO): Promise<IRole>;
  getAll(): Promise<IRole[]>;
  findById(userId: string): Promise<IRole | undefined>;
  findByName(name: string): Promise<IRole | undefined>;
  save(dataUpdate: IRole): Promise<void>;
  delete(user: IRole): Promise<void>;
  getTotal(): Promise<number>;
}

export { IRolesRepository };