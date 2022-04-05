import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { FakeUser } from '@modules/users/models/fakes/FakeUser';
import { IUser } from '@modules/users/models/IUser';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

class FakeUsersRepository implements IUsersRepository {
  private users: IUser[] = [];

  public async findById(user_id: string): Promise<IUser | undefined> {
    const findUser = this.users.find(user => user.id === user_id);

    return findUser;
  }

  public async findByEmail(email: string): Promise<IUser | undefined> {
    const findUser = this.users.find(user => user.email === email);

    return findUser;
  }

  public async create(data: ICreateUserDTO): Promise<IUser> {
    const user = new FakeUser(data);
    this.users.push(user);
    return user;
  }

  public async update(user: IUser): Promise<IUser> {
    this.users = this.users.map(oldUser =>
      oldUser.id !== user.id ? oldUser : user,
    );

    return user;
  }

  public async getAll(): Promise<[IUser[], number]> {
    return [this.users, this.users.length];
  }

  public async getTotal(): Promise<number> {
    return this.users.length;
  }

  public async save(data: IUser): Promise<void> {
    const searchUser = this.users.findIndex(user => user.id === data.id);

    if (searchUser >= 0) {
      Object.assign(this.users[searchUser], data);
    }
  }

  public async delete(user: IUser): Promise<void> {
    const listWithRemovedUsers = this.users.filter(item => item.id !== user.id);
    this.users = listWithRemovedUsers;
  }
}

export default FakeUsersRepository;
