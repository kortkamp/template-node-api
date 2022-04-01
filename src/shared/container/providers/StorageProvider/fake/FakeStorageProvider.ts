import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

import { IDeleteFileDTO } from '../dtos/IDeleteFileDTO';
import { ISaveFileDTO } from '../dtos/ISaveFileDTO';

class FakeStorageProvider implements IStorageProvider {
  private storage: ISaveFileDTO[] = [];

  public async saveFile(data: ISaveFileDTO): Promise<string> {
    this.storage.push(data);

    return data.fileName;
  }

  public async deleteFile({ file, type }: IDeleteFileDTO): Promise<void> {
    const findIndex = this.storage.findIndex(
      storageFileData =>
        storageFileData.fileName === file && storageFileData.type === type,
    );

    this.storage.splice(findIndex, 1);
  }
}

export default FakeStorageProvider;
