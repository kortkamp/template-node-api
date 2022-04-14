import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

import { IDeleteFileDTO } from '../dtos/IDeleteFileDTO';
import { ISaveFileDTO } from '../dtos/ISaveFileDTO';

class FakeStorageProvider implements IStorageProvider {
  private storage: ISaveFileDTO[] = [];

  public async saveFile(data: ISaveFileDTO): Promise<string> {
    this.storage.push(data);

    return data.tmpFile;
  }

  public async deleteFile({ file, type }: IDeleteFileDTO): Promise<void> {
    const findIndex = this.storage.findIndex(
      storageFileData =>
        storageFileData.tmpFile === file && storageFileData.type === type,
    );

    this.storage.splice(findIndex, 1);
  }
}

export default FakeStorageProvider;
