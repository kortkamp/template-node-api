import { Permissions } from '../models/IRole';

interface ICreateRoleDTO {
  name: string;

  usersPermissions: Permissions;

  rolesPermissions: Permissions;
}

export { ICreateRoleDTO };
