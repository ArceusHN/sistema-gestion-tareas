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
import { IRoleRepository, ROLE_REPOSITORY } from 'src/domain/repositories/role-repository.interface';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository, 
    @Inject(ROLE_REPOSITORY) private readonly roleRepository: IRoleRepository,
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

  async registerIn(loginRequest: LoginRequestDto): Promise<Result<LoginResponseDto>>{
    const userNameOrPasswordIsMissing = StringUtils.isNullOrWhiteSpace(loginRequest.username) ||
                                        StringUtils.isNullOrWhiteSpace(loginRequest.password);
  
    if(userNameOrPasswordIsMissing){
      return Result.fail('El usuario y la contraseña son requeridos.', HttpStatusCodes.BAD_REQUEST);
    }
  
    const existingUser = await this.userRepository.findByUsername(loginRequest.username);
    if (existingUser) {
      return Result.fail('El nombre de usuario ya está en uso.', HttpStatusCodes.BAD_REQUEST);
    }
  
    const createUserResult: Result<User> = await this.createUser(loginRequest);
  
    if(!createUserResult.ok){
      return Result.fail(createUserResult.error, createUserResult.statusCode);
    }
  
    const userData = createUserResult.getValue();
  
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

  async createUser(loginRequest: LoginRequestDto): Promise<Result<User>>{
    const USER_ROLE: number = 2;
    let {username, password} = loginRequest;
  
    try {
      password = await this.passwordHashingService.hashPassword(password);
  
      const rolePredefinido = await this.roleRepository.findById(USER_ROLE);
      if (!rolePredefinido) {
        return Result.fail('Error al asignar el rol de usuario. Inténtalo de nuevo más tarde.', HttpStatusCodes.NOT_FOUND);
      }
  
      const userToCreate: User = new User(0, username, password, true, rolePredefinido);
      const newUserCreated = await this.userRepository.save(userToCreate);
  
      if (!newUserCreated) {
        return Result.fail('Error al registrar el usuario. Inténtalo de nuevo.', HttpStatusCodes.INTERNAL_SERVER_ERROR);
      }
  
      return Result.ok(newUserCreated);
    } catch (error) {

      console.error('Error en createUser:', error);
      return Result.fail('Error inesperado en el registro de usuario.', HttpStatusCodes.INTERNAL_SERVER_ERROR);

    }
  }
}
