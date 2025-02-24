/* Main class */
import { 
  ITaskService, 
  ITask, 
  TaskStatus, 
  IUpdateTask 
} from "./task.interface";
import { IFileManager } from "../fs/fs.interface"
import FileManager from "../fs/fs.services"


class TaskService implements ITaskService {
  private TaskList: ITask[] = [];

  constructor(fsService: IFileManager<ITask>) {
    this.TaskList = fsService.readFile();
  }

  createTask(description: string): Promise<ITask> {
    const task = {
      id: 1,
      description,
      status: TaskStatus.TODO,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    this.TaskList.push(task);
    console.log('create')
    return Promise.resolve(task);

  }

  getTasks(status?: TaskStatus ): Promise<ITask[]> {
    return Promise.resolve(this.TaskList.filter((task) => task.status === status));
  }

  deleteTask(id: number): Promise<boolean> {
    const index = this.TaskList.findIndex((task) => task.id === id);
    if (index !== -1) {
      this.TaskList.splice(index, 1);
    }
    return Promise.resolve(true);
  }

  updateTask(id: number, updateTask: IUpdateTask): Promise<ITask | null> {
    const index = this.TaskList.findIndex((task) => task.id === id);
    return Promise.resolve(this.TaskList[index] || null);
  }
}

export default new TaskService(FileManager);