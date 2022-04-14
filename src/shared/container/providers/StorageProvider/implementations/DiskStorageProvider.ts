import uploadConfig from '@config/upload';
import fs from 'fs';
import { resolve } from 'path';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

import { IDeleteFileDTO } from '../dtos/IDeleteFileDTO';
import { ISaveFileDTO } from '../dtos/ISaveFileDTO';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile({ tmpFile, type }: ISaveFileDTO): Promise<string> {
    const upConfig = uploadConfig(type);

    await fs.promises.rename(
      resolve(upConfig.tmpFolder, tmpFile),
      resolve(upConfig.uploadsFolder, tmpFile),
    );

    return tmpFile;
  }

  public async deleteFile({ file, type }: IDeleteFileDTO): Promise<void> {
    const upConfig = uploadConfig(type);
    const tmpFilePath = resolve(upConfig.tmpFolder, file);
    const filePath = resolve(upConfig.uploadsFolder, file);

    const tmpFileExists = fs.existsSync(tmpFilePath);
    const fileExists = fs.existsSync(filePath);

    if (tmpFileExists) {
      await fs.promises.unlink(tmpFilePath);
    }

    if (fileExists) {
      await fs.promises.unlink(filePath);
    }
  }
}

export default DiskStorageProvider;
