import { ICreateRoleDTO } from '@modules/roles/dtos/ICreateRoleDTO';
import { FakeRole } from '@modules/roles/models/fakes/FakeRole';
import { IRole } from '@modules/roles/models/IRole';
import { IRolesRepository } from '@modules/roles/repositories/IRolesRepository';

class FakeRolesRepository implements IRolesRepository {
  private roles: IRole[] = [];

  public async findById(user_id: string): Promise<IRole | undefined> {
    const findUser = this.roles.find(user => user.id === user_id);

    return findUser;
  }

  public async findByName(email: string): Promise<IRole | undefined> {
    const role = this.roles.find(user => user.name === email);

    return role;
  }

  public async create(data: ICreateRoleDTO): Promise<IRole> {
    const role = new FakeRole(data);
    this.roles.push(role);
    return role;
  }

  public async update(role: IRole): Promise<IRole> {
    this.roles = this.roles.map(oldRole =>
      oldRole.id !== role.id ? oldRole : role,
    );

    return role;
  }

  public async getAll(): Promise<IRole[]> {
    return this.roles;
  }

  public async getTotal(): Promise<number> {
    return this.roles.length;
  }

  public async save(data: IRole): Promise<void> {
    const searchUser = this.roles.findIndex(user => user.id === data.id);

    if (searchUser >= 0) {
      Object.assign(this.roles[searchUser], data);
    }
  }

  public async delete(user: IRole): Promise<void> {
    const listWithRemovedUsers = this.roles.filter(item => item.id !== user.id);
    this.roles = listWithRemovedUsers;
  }
}

export default FakeRolesRepository;
