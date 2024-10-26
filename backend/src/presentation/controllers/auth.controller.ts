import { Controller, Post, Body, Inject, Res } from '@nestjs/common';
import { Response } from 'express';
import { LoginRequestDto } from 'src/application/dtos/auth/login-request.dto';
import { IAuthService } from 'src/application/interfaces/auth-service.interface';
import { AUTH_SERVICE } from 'src/application/interfaces/auth-service.interface';
import { HttpStatusCodes } from 'src/shared/helpers/http-status-codes';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AUTH_SERVICE) private readonly authService: IAuthService,
  ) {}

  @Post('login')
  async login(@Body() loginRequestDto: LoginRequestDto, @Res() res: Response): Promise<void> {
    
    const validateUserResult = await this.authService.logIn(loginRequestDto);

    if (!validateUserResult.ok) {
      res.status(validateUserResult.statusCode).json({
        message: validateUserResult.error,
      });

      return;
    }

    res.status(HttpStatusCodes.OK).json(validateUserResult.getValue());
  }
}
