import { Controller, Get, Param, Query, Inject, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ITaskStatusService, TASK_STATUS_SERVICE } from 'src/application/interfaces/task-status-service.interface';

@Controller('task-status')
export class TaskStatusController {
  constructor(@Inject(TASK_STATUS_SERVICE) private readonly taskStatusService: ITaskStatusService) {}

  @Get('all')
  async getAllTaskStatuses(@Res() res: Response) {
    const result = await this.taskStatusService.getAllTaskStatuses();

    if (!result.ok) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: result.error });
    }
    return res.status(HttpStatus.OK).json(result.getValue());
  }

  @Get(':id')
  async getTaskStatusById(@Param('id') id: number, @Res() res: Response) {
    const result = await this.taskStatusService.getTaskStatusById(id);

    if (!result.ok) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: result.error });
    }
    return res.status(HttpStatus.OK).json(result.getValue());
  }

  @Get()
  async getTaskStatusByName(@Query('name') name: string, @Res() res: Response) {
    const result = await this.taskStatusService.getTaskStatusByName(name);

    if (!result.ok) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: result.error });
    }
    return res.status(HttpStatus.OK).json(result.getValue());
  }

  
}
