import * as fs from 'fs';
import * as path from 'path';
import { IFileManager } from "./fs.interface";
import { ITask } from "../task/task.interface";

class FileManager<T> implements IFileManager<T> {
    private filePath: string;

    constructor(filePath: string) {
        this.filePath = path.resolve(filePath);
        const dir = path.dirname(this.filePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
            console.log(`Directory ${dir} created.`);
        }

        if (!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, JSON.stringify([]), 'utf-8');
            console.log(`File ${this.filePath} created.`);
        }
    }

    readFile(): T[] {
        try {
            const fileContent = fs.readFileSync(this.filePath, 'utf-8');
            return JSON.parse(fileContent) as T[];
        } catch (error) {
            if (error instanceof SyntaxError) {
                console.error(`Error parsing JSON from file ${this.filePath}:`, error.message);
                return [];
            }
            throw error;
        }
    }

    writeFile(data: T[]): void {
        fs.writeFileSync(
            this.filePath,
            JSON.stringify(data, null, 2),
            'utf-8'
        );
    }
}

export default new FileManager<ITask>('./db/task.json');