interface IUser {
  id: string;

  name: string;

  email: string;

  password: string;

  active: boolean;

  created_at: Date;

  updated_at: Date;
}

export { IUser };
