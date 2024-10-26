import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from '../entities/task.entity';
import { ITaskRepository } from 'src/domain/repositories/task-repository.interface';
import { Task, TaskStatus } from 'src/domain/entities/task.entity';
import { TaskMapper } from '../mappers/task.mapper';

@Injectable()
export class TaskRepository implements ITaskRepository {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepo: Repository<TaskEntity>,
  ) {}

  async findById(id: number): Promise<Task | null> {
    const taskEntity = await this.taskRepo.findOne({ where: { id } });
    return taskEntity ? TaskMapper.toDomain(taskEntity) : null;
  }

  async findByUserId(userId: number): Promise<Task[]> {
    const taskEntities = await this.taskRepo.find({ where: { user: { id: userId } } });
    return taskEntities.map(TaskMapper.toDomain);
  }

  async save(task: Task): Promise<Task> {
    const taskEntity = TaskMapper.toEntity(task);
    const savedEntity = await this.taskRepo.save(taskEntity);
    return TaskMapper.toDomain(savedEntity);
  }

  async updateStatus(taskId: number, status: TaskStatus, updatedById: number): Promise<void> {
    await this.taskRepo.update(taskId, { status, updatedById });
  }

  async delete(taskId: number): Promise<void> {
    await this.taskRepo.delete(taskId);
  }

  async update(task: Task): Promise<Task | null> {
    const taskEntity = await this.taskRepo.findOne({ where: { id: task.id } });
    if (!taskEntity) {
      return null;
    }

    taskEntity.title = task.title;
    taskEntity.description = task.description;
    taskEntity.status = task.status;
    taskEntity.updatedById = task.updatedBy;

    const updatedEntity = await this.taskRepo.save(taskEntity);
    return TaskMapper.toDomain(updatedEntity);
  }
}
