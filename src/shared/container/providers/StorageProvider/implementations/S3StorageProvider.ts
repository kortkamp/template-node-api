import uploadConfig from '@config/upload';
import aws, { S3 } from 'aws-sdk';
import fs from 'fs';
import mime from 'mime';
import { resolve } from 'path';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

import { IDeleteFileDTO } from '../dtos/IDeleteFileDTO';
import { ISaveFileDTO } from '../dtos/ISaveFileDTO';

class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: process.env.AWS_REGION,
    });
  }

  public async saveFile({ tmpFile, type }: ISaveFileDTO): Promise<string> {
    const upConfig = uploadConfig(type);
    const originalPath = resolve(upConfig.tmpFolder, tmpFile);

    const fileContent = await fs.promises.readFile(originalPath);

    const contentType = mime.getType(originalPath);

    if (!contentType) {
      throw new Error('File not found');
    }

    const { bucket } = uploadConfig(type).config.s3;

    await this.client
      .putObject({
        Bucket: bucket,
        Key: tmpFile,
        ACL: 'public-read',
        Body: fileContent,
        ContentType: contentType,
      })
      .promise();

    await fs.promises.unlink(originalPath);

    return tmpFile;
  }

  public async deleteFile({ file, type }: IDeleteFileDTO): Promise<void> {
    const { bucket } = uploadConfig(type).config.s3;

    await this.client
      .deleteObject({
        Bucket: bucket,
        Key: file,
      })
      .promise();
  }
}

export default S3StorageProvider;
