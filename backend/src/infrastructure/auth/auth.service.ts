import { Injectable, BadRequestException, UnauthorizedException, Inject } from '@nestjs/common';
import { IAuthService } from 'src/application/interfaces/auth-service.interface';
import { IUserRepository, USER_REPOSITORY } from 'src/domain/repositories/user-repository.interface';
import { PasswordHashingService } from './password-hashing.service';
import { JwtTokenService } from './jwt-token.service';
import { Result } from 'src/shared/results/result';
import { User } from 'src/domain/entities/user.entity';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
    private readonly passwordHashingService: PasswordHashingService,
    private readonly jwtTokenService: JwtTokenService,
  ) {}

  async validateUser(username: string, password: string): Promise<Result<User>> {
    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = user.isPasswordEncrypted
      ? await this.passwordHashingService.comparePasswords(password, user.password)
      : user.password === password;

    if (!isPasswordValid) {
      return Result.fail('Crendenciales invalidas');
    }

    return Result.ok(user);
  }

  async generateJWT(user: User): Promise<{ access_token: string }> {
    const payload = { username: user.username, sub: user.id, role: user.role };
    const token = await this.jwtTokenService.generateToken(payload);

    return { access_token: token };
  }
}
