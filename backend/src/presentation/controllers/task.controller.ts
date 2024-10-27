import { Controller, Get, Post, Put, Delete, Param, Body, Inject, UseGuards, Request, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { TASK_SERVICE, ITaskService } from 'src/application/interfaces/task-service.interface';
import { Roles } from '../decorators/roles.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { CreateTaskDto } from 'src/application/dtos/task/create-task-request.dto';
import { UpdateTaskRequestDto } from 'src/application/dtos/task/update-task-request.dto';
import { UpdateStatusTaskRequestDto } from 'src/application/dtos/task/update-status-task-request.dto';

@Controller('tasks')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TaskController {
  constructor(@Inject(TASK_SERVICE) private readonly taskService: ITaskService) {}


  @Get('all')
  async getAllTask(@Res() res: Response) {
    const result = await this.taskService.getAllTask();

    if (!result.ok) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: result.error });
    }
    return res.status(HttpStatus.OK).json(result.getValue());
  }

  @Post()
  @Roles('Administrador')
  async createTask(@Body() createTaskDto: CreateTaskDto, @Request() req, @Res() res: Response): Promise<void> {
    const userId = req.user.userId;

    const result = await this.taskService.createTask(createTaskDto, userId);

    if (!result.ok) {
      res.status(result.statusCode).json({ message: result.error });
      return;
    }

    res.status(HttpStatus.CREATED).json({ message: 'Tarea creada exitosamente.' });
  }

  @Put(':taskId')
  @Roles('Administrador')
  async updateTask(
    @Param('taskId') taskId: number,
    @Body() updateTaskDto: UpdateTaskRequestDto,
    @Request() req,
    @Res() res: Response,
  ): Promise<void> {
    const userId = req.user.userId;
    updateTaskDto.id = taskId;

    const result = await this.taskService.updateTask(updateTaskDto, userId);

    if (!result.ok) {
      res.status(result.statusCode).json({ message: result.error });
      return;
    }

    res.status(HttpStatus.OK).json({ message: 'Tarea actualizada exitosamente.' });
  }

  @Put(':taskId/status')
  async updateTaskStatus(
    @Param('taskId') taskId: number,
    @Body() updateTaskStatusDto: UpdateStatusTaskRequestDto,
    @Request() req,
    @Res() res: Response,
  ): Promise<void> {
    const userId = req.user.userId;
    updateTaskStatusDto.id = taskId;

    const result = await this.taskService.updateTaskStatus(updateTaskStatusDto, userId);

    if (!result.ok) {
      res.status(result.statusCode).json({ message: result.error });
      return;
    }

    res.status(HttpStatus.OK).json({ message: 'Estado de la tarea actualizado exitosamente.' });
  }

  @Get('user/:userId')
  async findByUserId(@Param('userId') userId: number, @Res() res: Response): Promise<void> {
    const result = await this.taskService.findByUserId(userId);

    if (!result.ok) {
      res.status(HttpStatus.BAD_REQUEST).json({ message: result.error });
      return;
    }

    res.status(HttpStatus.OK).json(result.getValue());
  }

  @Delete(':taskId')
  @Roles('Administrador')
  async deleteTask(@Param('taskId') taskId: number, @Res() res: Response): Promise<void> {
    const result = await this.taskService.deleteTask(taskId);

    if (!result.ok) {
      res.status(result.statusCode ?? HttpStatus.BAD_REQUEST).json({ message: result.error });
      return;
    }

    res.status(HttpStatus.NO_CONTENT).send();
  }
}
