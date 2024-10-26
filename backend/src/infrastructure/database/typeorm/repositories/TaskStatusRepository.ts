import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'src/domain/entities/role.entity';
import { TaskStatusEntity } from '../entities/task-status.entity';
import { TaskStatus } from 'src/domain/entities/task-status.entity';
import { ITaskStatusRepository } from 'src/domain/repositories/task-status-repository.interface';
import { TaskStatusMapper } from '../mappers/task-status.mapper';

@Injectable()
export class TaskStatusRepository implements ITaskStatusRepository {
  constructor(
    @InjectRepository(TaskStatusEntity)
    private readonly taskStatusRepo: Repository<TaskStatusEntity>,
  ) {}

  async findById(id: number): Promise<TaskStatus | null> {
    const TaskStatusEntity = await this.taskStatusRepo.findOne({ where: { id } });
    return TaskStatusEntity ? TaskStatusMapper.toDomain(TaskStatusEntity) : null;
  }

  async findByName(name: string): Promise<Role | null> {
    const TaskStatusEntity = await this.taskStatusRepo.findOne({ where: { name } });
    return TaskStatusEntity ? TaskStatusMapper.toDomain(TaskStatusEntity) : null;
  }

  async findAll(): Promise<Role[]> {
    const TaskStatusEntity = await this.taskStatusRepo.find();
    return TaskStatusEntity.map(TaskStatusMapper.toDomain);
  }
}
