import { User } from "src/domain/entities/user.entity";
import { Result } from "src/shared/results/result";


export interface IUserService {
  getAll(): Promise<Result<User[]>>
}

export const USER_SERVICE = Symbol('IUserService');
