export default interface IStorageProvider {
  saveFile(tmpFile: string, fileName: string, type: string): Promise<string>;
  deleteFile(file: string, type: string): Promise<void>;
}
