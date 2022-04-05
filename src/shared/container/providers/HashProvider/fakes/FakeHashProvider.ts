import { IHashProvider } from '../models/IHashProvider';

class FakeHashProvider implements IHashProvider {
  public async create(payload: string, _: number): Promise<string> {
    return payload;
  }

  public async verify(hashed: string, payload: string): Promise<boolean> {
    return hashed === payload;
  }
}

export { FakeHashProvider };
