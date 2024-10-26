import { forwardRef, Module } from '@nestjs/common';
import { ApplicationModule } from '../application/application.module';
import { TaskController } from './controllers/task.controller';
import { AuthController } from './controllers/auth.controller';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        forwardRef(() => InfrastructureModule),
        forwardRef(() => ApplicationModule)
    ],
    controllers: [TaskController, AuthController],
    providers: [JwtAuthGuard, RolesGuard, JwtStrategy],
})
export class PresentationModule {}
