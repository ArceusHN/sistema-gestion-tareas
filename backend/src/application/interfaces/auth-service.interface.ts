import { User } from "src/domain/entities/user.entity";
import { Result } from "src/shared/results/result";
import { LoginRequestDto } from "../dtos/auth/login-request.dto";
import { LoginResponseDto } from "../dtos/auth/login-response.dto";

export interface IAuthService {
    logIn(loginRequest: LoginRequestDto): Promise<Result<LoginResponseDto>>;  
    registerIn(loginRequest: LoginRequestDto): Promise<Result<LoginResponseDto>>; 
    validateUserCredentials(username: string, password: string): Promise<Result<User>>;
    generateUserJWT(user: User): Promise<{ access_token: string }>;
  }
  
export const AUTH_SERVICE = Symbol('IAuthService');
  