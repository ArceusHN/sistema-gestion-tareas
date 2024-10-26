import { Inject, Injectable } from '@nestjs/common';
import { ITaskService } from '../interfaces/task-service.interface';
import { ITaskRepository, TASK_REPOSITORY } from 'src/domain/repositories/task-repository.interface';
import { IUserRepository, USER_REPOSITORY } from 'src/domain/repositories/user-repository.interface';
import { Task, TaskStatusEnum } from 'src/domain/entities/task.entity';
import { Result } from 'src/shared/results/result';
import { CreateTaskDto } from 'src/application/dtos/task/create-task-request.dto';
import { HttpStatusCodes } from 'src/shared/helpers/http-status-codes';
import { UpdateTaskRequestDto } from '../dtos/task/update-task-request.dto';
import { StringUtils } from 'src/shared/helpers/string-utils';
import { TaskStatusHelper } from 'src/shared/helpers/task-status-helper';
import { UpdateStatusTaskRequestDto } from '../dtos/task/update-status-task-request.dto';
import { TaskStatus } from 'src/domain/entities/task-status.entity';
import { ITaskStatusRepository, TASK_STATUS_REPOSITORY } from 'src/domain/repositories/task-status-repository.interface';

@Injectable()
export class TaskService implements ITaskService {
  constructor(
    @Inject(TASK_REPOSITORY) private readonly taskRepository: ITaskRepository,
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
    @Inject(TASK_STATUS_REPOSITORY) private readonly taskStatusRepository: ITaskStatusRepository
  ) {}

  async createTask(createTaskDto: CreateTaskDto, userWhoCreateId: number): Promise<Result<void>> {
    const userToAssignTask = await this.userRepository.findById(createTaskDto.userId);

    if (!userToAssignTask) {
      return Result.fail('No se encontró el usuario para asignar la tarea.', HttpStatusCodes.BAD_REQUEST);
    }

    const newTask = new Task(0, createTaskDto.title, createTaskDto.description, Number(TaskStatusEnum.PENDING), userToAssignTask, userWhoCreateId);

    await this.taskRepository.save(newTask);

    return Result.ok();
  }

  async updateTask(updateTask: UpdateTaskRequestDto, userWhoModifyId: number): Promise<Result<void>> {
    const validationResult = this.validateUpdateTaskValues(updateTask);

    if (!validationResult.ok) {
      return validationResult;
    }
  
    const task = await this.taskRepository.findById(updateTask.id);

    if (!task) {
      return Result.fail('La tarea no fue encontrada. Por favor, intente nuevamente.', HttpStatusCodes.BAD_REQUEST);
    }
  
    task.title = updateTask.title;
    task.description = updateTask.description;
    task.status = updateTask.status;
    task.updatedBy = userWhoModifyId;
  
    await this.taskRepository.update(task);
    
    return Result.ok();
  }

  async updateTaskStatus(updateStatusTask: UpdateStatusTaskRequestDto, userWhoModifyId: number): Promise<Result<void>>{

    const validationResult = this.validateUpdateStatusValues(updateStatusTask);

    if (!validationResult.ok) {
      return validationResult;
    }

    await this.taskRepository.updateStatus(updateStatusTask.id, updateStatusTask.status, userWhoModifyId); 

    return Result.ok();
  }

  async findByUserId(userId: number): Promise<Result<Task[]>> {
    const tasks = await this.taskRepository.findByUserId(userId);

    return Result.ok(tasks);
  }

  async deleteTask(taskId: number): Promise<Result<void>> {
    const task = this.taskRepository.findById(taskId)

    if (!task) {
      return Result.fail('La tarea no fue encontrada. Por favor, intente nuevamente.');
    }

    await this.taskRepository.delete(taskId);

    return Result.ok();
  }

  private validateUpdateTaskValues(updateTask: UpdateTaskRequestDto): Result<void> {
    if (StringUtils.isNullOrWhiteSpace(updateTask.title)) {
      return Result.fail('El título de la tarea es requerido.');
    }
  
    if (StringUtils.isNullOrWhiteSpace(updateTask.description)) {
      return Result.fail('La descripción de la tarea es requerida.');
    }
  
    if (!updateTask.userAssignTaskId || updateTask.userAssignTaskId === 0) {
      return Result.fail('La tarea debe estar asignada a un usuario.');
    }

    const statusResult = TaskStatusHelper.convertStatus(updateTask.status);
    if (!statusResult.ok) {
      return Result.fail(statusResult.error);
    }
  
    return Result.ok();
  }  

  private validateUpdateStatusValues(updateStatusTask: UpdateStatusTaskRequestDto): Result<void>{
    if(!updateStatusTask.id || updateStatusTask.id <= 0){
      return Result.fail('El identificador de la tarea no ha sido proporcionado.');
    }

    const statusResult = TaskStatusHelper.convertStatus(updateStatusTask.status);
    if (!statusResult.ok) {
      return Result.fail(statusResult.error);
    }
  }
}
