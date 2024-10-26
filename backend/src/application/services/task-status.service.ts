import { Inject, Injectable } from '@nestjs/common';
import { ITaskStatusService } from 'src/application/interfaces/task-status-service.interface';
import { ITaskStatusRepository, TASK_STATUS_REPOSITORY } from 'src/domain/repositories/task-status-repository.interface';
import { TaskStatus } from 'src/domain/entities/task-status.entity';
import { Result } from 'src/shared/results/result';

@Injectable()
export class TaskStatusService implements ITaskStatusService {
  constructor(
    @Inject(TASK_STATUS_REPOSITORY)
    private readonly taskStatusRepository: ITaskStatusRepository,
  ) {}

  async getTaskStatusById(id: number): Promise<Result<TaskStatus>> {
    const status = await this.taskStatusRepository.findById(id);
    if (!status) {
      return Result.fail('No se encontró el estado.');
    }
    return Result.ok(status);
  }

  async getTaskStatusByName(name: string): Promise<Result<TaskStatus>> {
    const status = await this.taskStatusRepository.findByName(name);
    if (!status) {
      return Result.fail('No se encontró el estado con el nombre especificado.');
    }
    return Result.ok(status);
  }

  async getAllTaskStatuses(): Promise<Result<TaskStatus[]>> {
    const statuses = await this.taskStatusRepository.findAll();
    return Result.ok(statuses);
  }
}
