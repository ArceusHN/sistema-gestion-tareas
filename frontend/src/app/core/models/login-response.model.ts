import { Role } from "./role.model";

export class LoginResponse {
    constructor(
      public accessToken: string,
      public userName: string,
      public role: Role,
      public expiresAt: Date
    ) {}
  }