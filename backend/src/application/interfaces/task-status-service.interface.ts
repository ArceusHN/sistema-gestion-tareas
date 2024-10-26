import { TaskStatus } from 'src/domain/entities/task-status.entity';
import { Result } from 'src/shared/results/result';

export interface ITaskStatusService {
  getTaskStatusById(id: number): Promise<Result<TaskStatus>>;
  getTaskStatusByName(name: string): Promise<Result<TaskStatus>>;
  getAllTaskStatuses(): Promise<Result<TaskStatus[]>>;
}

export const TASK_STATUS_SERVICE = Symbol('ITaskStatusService');
