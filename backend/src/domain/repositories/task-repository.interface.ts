import { Task } from '../entities/task.entity';
import { TaskStatus } from '../entities/task.entity';

export interface ITaskRepository {
  findById(id: number): Promise<Task | null>;
  findByUserId(userId: number): Promise<Task[]>;
  save(task: Task): Promise<Task>;
  updateStatus(taskId: number, status: TaskStatus, updatedById: number): Promise<void>;
  delete(taskId: number): Promise<void>;
  update(task: Task): Promise<Task | null>;
}

export const TASK_REPOSITORY = Symbol('ITaskRepository');
