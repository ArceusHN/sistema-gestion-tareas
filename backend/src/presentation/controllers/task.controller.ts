import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus, Inject, UseGuards } from '@nestjs/common';
import { TaskStatus } from 'src/domain/entities/task.entity';
import { ApiTags, ApiOperation, ApiBody} from '@nestjs/swagger';
import { TASK_SERVICE, ITaskService } from 'src/application/interfaces/task-service.interface';
import { Roles } from '../decorators/roles.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';

@ApiTags('tasks')
@Controller('tasks')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TaskController {
  constructor(@Inject(TASK_SERVICE) private readonly taskService: ITaskService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva tarea' })
  @ApiBody({ schema: { example: { title: 'Task Title', description: 'Task Description', userId: 1 } } })
  @Roles('Administrador')
  async createTask(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('userId') userId: number,
  ) {
    try {
      return await this.taskService.createTask(title, description, userId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Put(':taskId/status')
  @ApiOperation({ summary: 'Actualizar el estado de una tarea' })
  async updateTaskStatus(
    @Param('taskId') taskId: number,
    @Body('status') status: TaskStatus,
  ) {
    return await this.taskService.updateTaskStatus(taskId, status);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Obtener tareas por usuario' })
  async findByUserId(@Param('userId') userId: number) {
    return await this.taskService.findByUserId(userId);
  }

  @Delete(':taskId')
  @ApiOperation({ summary: 'Eliminar una tarea' })
  async deleteTask(@Param('taskId') taskId: number) {
    await this.taskService.deleteTask(taskId);
  }
}
