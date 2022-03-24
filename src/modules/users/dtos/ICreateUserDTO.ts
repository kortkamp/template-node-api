interface ICreateUserDTO {
  email: string;
  name: string;
  role_id: string;
  password: string;
  active?: boolean;
}

export { ICreateUserDTO };
