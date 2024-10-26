import { Task } from 'src/domain/entities/task.entity';
import { TaskStatus } from 'src/domain/entities/task.entity';

export interface ITaskService {
  createTask(title: string, description: string, userId: number): Promise<Task>;
  updateTaskStatus(taskId: number, status: TaskStatus): Promise<void>;
  findByUserId(userId: number): Promise<Task[]>;
  deleteTask(taskId: number): Promise<void>;
}

export const TASK_SERVICE = Symbol('ITaskService');
