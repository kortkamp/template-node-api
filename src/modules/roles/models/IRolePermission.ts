interface IRolePermission {
  id: string;

  resource: string;

  role_id: string;

  list: boolean;

  create: boolean;

  read: boolean;

  update: boolean;

  delete: boolean;

  created_at: Date;

  updated_at: Date;
}

export { IRolePermission };
