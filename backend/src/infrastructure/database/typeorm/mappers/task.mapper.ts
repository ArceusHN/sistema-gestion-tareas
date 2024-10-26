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
      entity.user ? UserMapper.toDomain(entity.user) : undefined,
      entity.createdById,
      entity.createdById,
      entity.createdAt,
      entity.updatedAt,
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
    taskEntity.createdById = domain.createdBy;
    taskEntity.createdById = domain.updatedBy;
    return taskEntity;
  }
}
