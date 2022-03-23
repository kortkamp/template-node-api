/* eslint-disable no-bitwise */
enum Permissions {
  VIEW = 1,
  LIST = 2,
  CREATE = 4,
  UPDATE = 8,
  DELETE = 16,
  ALL = VIEW | LIST | CREATE | UPDATE | DELETE,
}

interface IRole {
  id: string;

  name: string;

  usersPermissions: Permissions;

  rolesPermissions: Permissions;

  created_at: Date;

  updated_at: Date;
}

export { IRole, Permissions };
