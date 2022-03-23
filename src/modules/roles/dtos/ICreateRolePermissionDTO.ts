interface ICreateRolePermissionDTO {
  resource: string;

  role_id: string;

  list: boolean;

  create: boolean;

  read: boolean;

  update: boolean;

  delete: boolean;
}

export { ICreateRolePermissionDTO };
