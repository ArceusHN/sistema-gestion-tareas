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
    
    const loginResult = await this.authService.logIn(loginRequestDto);

    if (!loginResult.ok) {
      res.status(loginResult.statusCode).json({
        message: loginResult.error,
      });

      return;
    }

    res.status(HttpStatusCodes.OK).json(loginResult.getValue());
  }

  @Post('register')
  async registerAccount(@Body() loginRequestDto: LoginRequestDto, @Res() res: Response): Promise<void> {
    
    const registerInResult = await this.authService.registerIn(loginRequestDto);

    if (!registerInResult.ok) {
      res.status(registerInResult.statusCode).json({
        message: registerInResult.error,
      });

      return;
    }

    res.status(HttpStatusCodes.OK).json(registerInResult.getValue());
  }
}
