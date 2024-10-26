import { Task } from 'src/domain/entities/task.entity';
import { CreateTaskDto } from '../dtos/task/create-task-request.dto';
import { Result } from 'src/shared/results/result';
import { UpdateTaskRequestDto } from '../dtos/task/update-task-request.dto';
import { UpdateStatusTaskRequestDto } from '../dtos/task/update-status-task-request.dto';
import { TaskStatus } from 'src/domain/entities/task-status.entity';

export interface ITaskService {
  createTask(createTask: CreateTaskDto, userWhoCreateId: number): Promise<Result<void>>;
  updateTask(updateTask: UpdateTaskRequestDto, userWhoModifyId: number): Promise<Result<void>>;
  updateTaskStatus(updateStatusTask: UpdateStatusTaskRequestDto, userWhoModifyId: number): Promise<Result<void>>;
  findByUserId(userId: number): Promise<Result<Task[]>>;
  deleteTask(taskId: number): Promise<Result<void>>;
}

export const TASK_SERVICE = Symbol('ITaskService');
