import { User } from "src/domain/entities/user.entity";
import { Result } from "src/shared/results/result";

export interface IAuthService {
    validateUser(username: string, password: string): Promise<Result<User>>;
    generateJWT(user: User): Promise<{ access_token: string }>;
  }
  
export const AUTH_SERVICE = Symbol('IAuthService');
  