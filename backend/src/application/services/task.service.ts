import { Inject, Injectable } from '@nestjs/common';
import { ITaskService } from '../interfaces/task-service.interface';
import { ITaskRepository, TASK_REPOSITORY } from 'src/domain/repositories/task-repository.interface';
import { IUserRepository, USER_REPOSITORY } from 'src/domain/repositories/user-repository.interface';
import { Task } from 'src/domain/entities/task.entity';
import { TaskStatus } from 'src/domain/entities/task.entity';
import { User } from 'src/domain/entities/user.entity';

@Injectable()
export class TaskService implements ITaskService {
  constructor(
    @Inject(TASK_REPOSITORY) private readonly taskRepository: ITaskRepository,
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
  ) {}

  async createTask(title: string, description: string, userId: number): Promise<Task> {
    const user: User | null = await this.userRepository.findById(userId);

    if (!user) {
      throw new Error('User not found'); 
    }

    const newTask = new Task(0, title, description, TaskStatus.PENDING, user);

    return this.taskRepository.save(newTask);
  }

  async updateTaskStatus(taskId: number, status: TaskStatus): Promise<void> {
    return this.taskRepository.updateStatus(taskId, status); 
  }

  async findByUserId(userId: number): Promise<Task[]> {
    return this.taskRepository.findByUserId(userId); 
  }

  async deleteTask(taskId: number): Promise<void> {
    return this.taskRepository.delete(taskId);
  }
}
