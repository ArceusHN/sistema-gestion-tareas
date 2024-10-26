import { Role } from "src/domain/entities/role.entity";

export class LoginResponseDto {
    accessToken: string;
    userName: string;
    role: Role;
    expiresAt: Date; 
  
    constructor(accessToken: string, userName: string, role: Role, expiresAt: Date) {
      this.accessToken = accessToken;
      this.userName = userName;
      this.role = role;
      this.expiresAt = expiresAt;
    }
  }
  