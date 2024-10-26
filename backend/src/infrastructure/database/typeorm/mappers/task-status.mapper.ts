import { TaskStatus } from 'src/domain/entities/task-status.entity';
import { TaskStatusEntity } from '../entities/task-status.entity';

export class TaskStatusMapper {
  static toDomain(entity: TaskStatusEntity): TaskStatus {
    return new TaskStatus(entity.id, entity.name);
  }

  static toEntity(domain: TaskStatus): TaskStatusEntity {
    const roleEntity = new TaskStatusEntity();
    roleEntity.id = domain.id;
    roleEntity.name = domain.name;
    return roleEntity;
  }
}
