import { Injectable, BadRequestException, UnauthorizedException, Inject } from '@nestjs/common';
import { IAuthService } from 'src/application/interfaces/auth-service.interface';
import { IUserRepository, USER_REPOSITORY } from 'src/domain/repositories/user-repository.interface';
import { PasswordHashingService } from './password-hashing.service';
import { JwtTokenService } from './jwt-token.service';
import { Result } from 'src/shared/results/result';
import { User } from 'src/domain/entities/user.entity';
import { LoginRequestDto } from 'src/application/dtos/auth/login-request.dto';
import { LoginResponseDto } from 'src/application/dtos/auth/login-response.dto';
import { HttpStatusCodes } from 'src/shared/helpers/http-status-codes';
import { StringUtils } from 'src/shared/helpers/string-utils';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
    private readonly passwordHashingService: PasswordHashingService,
    private readonly jwtTokenService: JwtTokenService,
    private readonly configService: ConfigService,
  ) {}

  async logIn(loginRequest: LoginRequestDto): Promise<Result<LoginResponseDto>>{

    const userNameOrPasswordIsMissing = StringUtils.isNullOrWhiteSpace(loginRequest.username) ||
                                        StringUtils.isNullOrWhiteSpace(loginRequest.password)

    if(userNameOrPasswordIsMissing){
      return Result.fail('El usuario y la contraseña son requeridos.', HttpStatusCodes.BAD_REQUEST);
    }

    const validateUserResult: Result<User> = await this.validateUserCredentials(loginRequest.username, loginRequest.password);

    if(!validateUserResult.ok){
      return Result.fail(validateUserResult.error, validateUserResult.statusCode);
    }

    const userData = validateUserResult.getValue();

    const userToken = await this.generateUserJWT(userData);

    return Result.ok(new LoginResponseDto(userToken.access_token, userData.username, userData.role, userToken.expiresAt));
  } 

  async validateUserCredentials(username: string, password: string): Promise<Result<User>> {
    const user = await this.userRepository.findByUsername(username);

    if (!user) {
      return Result.fail('El usuario y/o contraseña son inválidos.', HttpStatusCodes.NOT_FOUND);
    }

    const isPasswordValid = user.isPasswordEncrypted
      ? await this.passwordHashingService.comparePasswords(password, user.password)
      : user.password === password;

    if (!isPasswordValid) {
      return Result.fail('El usuario y/o contraseña son inválidos.', HttpStatusCodes.UNAUTHORIZED);
    }

    return Result.ok(user);
  }

  async generateUserJWT(user: User): Promise<{ access_token: string; expiresAt: Date }> {
    const payload = { username: user.username, sub: user.id, role: user.role };

    const expiresIn = this.configService.get<number>('JWT_EXPIRATION_SECONDS') || 3600;

    const token = await this.jwtTokenService.generateToken(payload);

    const expiresAt = new Date(Date.now() + expiresIn * 1000);
    
    return { access_token: token, expiresAt };
  }
}
