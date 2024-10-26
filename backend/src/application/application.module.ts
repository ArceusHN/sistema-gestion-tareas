import { forwardRef, Module } from '@nestjs/common';
import { TASK_SERVICE } from './interfaces/task-service.interface';
import { TaskService } from './services/task.service';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { TASK_STATUS_SERVICE } from './interfaces/task-status-service.interface';
import { TaskStatusService } from './services/task-status.service';

@Module({
  imports: [forwardRef(() => InfrastructureModule)],
  providers: [
    {
      provide: TASK_SERVICE,
      useClass: TaskService,
    },
    {
      provide: TASK_STATUS_SERVICE,
      useClass: TaskStatusService
    },
  ],
  exports: [TASK_SERVICE, TASK_STATUS_SERVICE],
})
export class ApplicationModule {}
