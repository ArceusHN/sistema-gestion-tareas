import { TaskStatus } from '../entities/task-status.entity';

export interface ITaskStatusRepository {
  findById(id: number): Promise<TaskStatus | null>;
  findByName(name: string): Promise<TaskStatus | null>;
  findAll(): Promise<TaskStatus[]>;
}

export const TASK_STATUS_REPOSITORY = Symbol('ITaskStatusRepository');