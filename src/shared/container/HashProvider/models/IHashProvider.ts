interface IHashProvider {
  create(payload: string, salt: number): Promise<string>;
  verify(hashed: string, payload: string): Promise<boolean>;
}

export { IHashProvider };
