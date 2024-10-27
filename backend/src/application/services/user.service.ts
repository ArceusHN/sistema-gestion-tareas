import { Inject, Injectable } from '@nestjs/common';
import { IUserService } from '../interfaces/user-service.interface';
import { User } from 'src/domain/entities/user.entity';
import { Result } from 'src/shared/results/result';
import { IUserRepository, USER_REPOSITORY } from 'src/domain/repositories/user-repository.interface';


@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly UserRepository: IUserRepository,
  ) {}

  async getAll(): Promise<Result<User[]>> {
    const users = await this.UserRepository.findAll();
    
    return Result.ok(users);
  } 

}
