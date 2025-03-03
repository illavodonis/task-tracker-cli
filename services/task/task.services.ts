/* Main class */
import { 
  ITaskService, 
  ITask, 
  TaskStatus, 
  IUpdateTask 
} from "./task.interface";
import { IFileManager } from "../fs/fs.interface"
import FileManager from "../fs/fs.services"
import fsServices from "../fs/fs.services";


class TaskService implements ITaskService {
  private TaskList: ITask[] = [];

  constructor(fsService: IFileManager<ITask>) {
    this.TaskList = fsService.readFile();
  }

  createTask(description: string): ITask {
    const task = {
      id: 1,
      description,
      status: TaskStatus.TODO,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    this.TaskList.push(task);
    console.log("tasklist:", this);
    fsServices.writeFile(this.TaskList);
    console.log('create')
    return task;

  }

  getTasks(status?: TaskStatus ): ITask[] {
    const res = status ? 
    this.TaskList.filter(task =>task.status === status)
    : this.TaskList
    console.log(res);
    return res
  }

  deleteTask(id: number): boolean {
    const index = this.TaskList.findIndex((task) => task.id === id);
    if (index !== -1) {
      this.TaskList.splice(index, 1);
    }
    return true;
  }

  updateTask(id: number, updateTask: IUpdateTask): ITask | null {
    const index = this.TaskList.findIndex((task) => task.id === id);
    return this.TaskList[index] || null;
  }
}

export default new TaskService(FileManager);