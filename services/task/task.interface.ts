export enum TaskStatus {
  TODO = "todo",
  IN_PROGRESS = "in-progress",
  DONE = "done",
}
export interface ITask {
  id: number;
  description: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUpdateTask extends Partial<Omit<ITask, 'id' | 'createdAt'>> {}

export interface ITaskService {
  getTasks(status?: TaskStatus): Promise<ITask[]>;
  createTask(description: string): Promise<ITask>;
  updateTask(id: number, updateTask: IUpdateTask): Promise<ITask | null>;
  deleteTask(id: number): Promise<boolean>;
}