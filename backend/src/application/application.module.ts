import { forwardRef, Module } from '@nestjs/common';
import { TASK_SERVICE } from './interfaces/task-service.interface';
import { TaskService } from './services/task.service';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';

@Module({
  imports: [forwardRef(() => InfrastructureModule)],
  providers: [
    {
      provide: TASK_SERVICE,
      useClass: TaskService,
    },
  ],
  exports: [TASK_SERVICE],
})
export class ApplicationModule {}
