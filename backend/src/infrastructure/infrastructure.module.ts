import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TASK_REPOSITORY } from '../domain/repositories/task-repository.interface';
import { TaskEntity } from './database/typeorm/entities/task.entity';
import { RoleEntity } from './database/typeorm/entities/role.entity';
import { UserEntity } from './database/typeorm/entities/user.entity';
import { TaskRepository } from './database/typeorm/repositories/TaskRepository';
import { USER_REPOSITORY } from 'src/domain/repositories/user-repository.interface';
import { UserRepository } from './database/typeorm/repositories/UserRepository';
import { ApplicationModule } from 'src/application/application.module';
import { AUTH_SERVICE } from 'src/application/interfaces/auth-service.interface';
import { AuthService } from './auth/auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PasswordHashingService } from './auth/password-hashing.service';
import { JwtTokenService } from './auth/jwt-token.service';
import { TASK_STATUS_REPOSITORY } from 'src/domain/repositories/task-status-repository.interface';
import { TaskStatusRepository } from './database/typeorm/repositories/TaskStatusRepository';
import { TaskStatusEntity } from './database/typeorm/entities/task-status.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([TaskEntity, RoleEntity, UserEntity, TaskStatusEntity]),
    forwardRef(() => ApplicationModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  providers: [
    {
        provide: TASK_REPOSITORY,
        useClass: TaskRepository,
    },
    {
        provide: USER_REPOSITORY,
        useClass: UserRepository,
    },
    {
        provide: AUTH_SERVICE,
        useClass: AuthService
    },
    {
      provide: TASK_STATUS_REPOSITORY,
      useClass: TaskStatusRepository
    },
    PasswordHashingService,
    JwtTokenService
  ],
  exports: [TASK_REPOSITORY, USER_REPOSITORY, AUTH_SERVICE, TASK_STATUS_REPOSITORY],
})
export class InfrastructureModule {}
