import { Controller, Get, Param, Query, Inject, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { IUserService, USER_SERVICE } from 'src/application/interfaces/user-service.interface';

@Controller('user')
export class UserController {
  constructor(@Inject(USER_SERVICE) private readonly userService: IUserService) {}

  @Get('all')
  async getAll(@Res() res: Response) {
    const result = await this.userService.getAll();

    if (!result.ok) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: result.error });
    }
    return res.status(HttpStatus.OK).json(result.getValue());
  }

}
