import { Task } from 'src/domain/entities/task.entity';
import { TaskEntity } from '../entities/task.entity';
import { UserMapper } from './user.mapper';

export class TaskMapper {
  static toDomain(entity: TaskEntity): Task {
    return new Task(
      entity.id,
      entity.title,
      entity.description,
      entity.status,
      UserMapper.toDomain(entity.user),
      entity.createdAt,
      entity.updatedAt,
      entity.createdBy ? UserMapper.toDomain(entity.createdBy) : undefined,
      entity.updatedBy ? UserMapper.toDomain(entity.updatedBy) : undefined,
    );
  }

  static toEntity(domain: Task): TaskEntity {
    const taskEntity = new TaskEntity();
    taskEntity.id = domain.id;
    taskEntity.title = domain.title;
    taskEntity.description = domain.description;
    taskEntity.status = domain.status;
    taskEntity.user = UserMapper.toEntity(domain.user);
    taskEntity.createdAt = domain.createdAt;
    taskEntity.updatedAt = domain.updatedAt;
    taskEntity.createdBy = domain.createdBy ? UserMapper.toEntity(domain.createdBy) : undefined;
    taskEntity.updatedBy = domain.updatedBy ? UserMapper.toEntity(domain.updatedBy) : undefined;
    return taskEntity;
  }
}
