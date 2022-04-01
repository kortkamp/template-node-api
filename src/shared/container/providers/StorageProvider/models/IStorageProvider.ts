import { IDeleteFileDTO } from '../dtos/IDeleteFileDTO';
import { ISaveFileDTO } from '../dtos/ISaveFileDTO';

export default interface IStorageProvider {
  saveFile(data: ISaveFileDTO): Promise<string>;
  deleteFile(data: IDeleteFileDTO): Promise<void>;
}
