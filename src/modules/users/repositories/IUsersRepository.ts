import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { IUser } from '../models/IUser';

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<IUser>;
  getAll(): Promise<IUser[]>;
  findById(userId: string): Promise<IUser | undefined>;
  findByEmail(email: string): Promise<IUser | undefined>;
  save(dataUpdate: IUser): Promise<void>;
  delete(user: IUser): Promise<void>;
  getTotal(): Promise<number>;
}

export { IUsersRepository };
