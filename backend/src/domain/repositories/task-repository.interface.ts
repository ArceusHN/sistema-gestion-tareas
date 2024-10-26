import { Task } from '../entities/task.entity';
import { TaskStatus } from '../entities/task.entity';

export interface ITaskRepository {
  findById(id: number): Promise<Task | null>;
  findByUserId(userId: number): Promise<Task[]>;
  save(task: Task): Promise<Task>;
  updateStatus(taskId: number, status: TaskStatus): Promise<void>;
  delete(taskId: number): Promise<void>;
}

export const TASK_REPOSITORY = Symbol('ITaskRepository');
