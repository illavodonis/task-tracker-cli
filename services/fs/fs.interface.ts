export interface IFileManager<T> {
    writeFile(data: T[]): void;
    readFile(): T[];
}