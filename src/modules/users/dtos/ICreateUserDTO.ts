interface ICreateUserDTO {
  email: string;
  name: string;
  password: string;
  active?: boolean;
}

export { ICreateUserDTO };
