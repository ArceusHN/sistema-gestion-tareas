import { Task } from '../entities/task.entity';

export interface ITaskRepository {
  getAll(): Promise<Task[]>;
  findById(id: number): Promise<Task | null>;
  findByUserId(userId: number): Promise<Task[]>;
  save(task: Task): Promise<Task>;
  updateStatus(taskId: number, status: number, updatedById: number): Promise<void>;
  delete(taskId: number): Promise<void>;
  update(task: Task): Promise<Task | null>;
}

export const TASK_REPOSITORY = Symbol('ITaskRepository');
