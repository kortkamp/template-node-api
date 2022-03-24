interface IUser {
  id: string;

  name: string;

  role_id: string;

  email: string;

  password: string;

  active: boolean;

  created_at: Date;

  updated_at: Date;
}

export { IUser };
