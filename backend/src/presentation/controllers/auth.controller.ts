import { Controller, Post, Body, Inject, UnauthorizedException } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IAuthService } from 'src/application/interfaces/auth-service.interface';
import { AUTH_SERVICE } from 'src/application/interfaces/auth-service.interface';
import { User } from 'src/domain/entities/user.entity';
import { Result } from 'src/shared/results/result';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AUTH_SERVICE) private readonly authService: IAuthService,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'Crear una nueva tarea' })
  @ApiBody({ schema: { example: { username: 'UserName', password: 'Password'} } })
  async login(@Body('username') username: string, @Body('password') password: string) {

    const validateUserResult: Result<User> = await this.authService.validateUser(username, password);

    if (!validateUserResult.isSuccess) {
      throw new UnauthorizedException(validateUserResult.error);
    }
    
    return this.authService.generateJWT(validateUserResult.getValue());
  }
}
