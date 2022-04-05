import { hash, compare } from 'bcryptjs';

import { IHashProvider } from '../models/IHashProvider';

class BCryptHashProvider implements IHashProvider {
  public async create(payload: string, salt: number): Promise<string> {
    return hash(payload, salt);
  }

  public async verify(hashed: string, payload: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}

export { BCryptHashProvider };
