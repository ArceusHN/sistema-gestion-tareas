import { forwardRef, Module } from '@nestjs/common';
import { TASK_SERVICE } from './interfaces/task-service.interface';
import { TaskService } from './services/task.service';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { TASK_STATUS_SERVICE } from './interfaces/task-status-service.interface';
import { TaskStatusService } from './services/task-status.service';
import { USER_SERVICE } from './interfaces/user-service.interface';
import { UserService } from './services/user.service';

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
    {
      provide: USER_SERVICE,
      useClass: UserService
    },
  ],
  exports: [TASK_SERVICE, TASK_STATUS_SERVICE, USER_SERVICE],
})
export class ApplicationModule {}
