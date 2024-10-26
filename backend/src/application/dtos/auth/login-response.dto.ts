export class LoginResponseDto {
    accessToken: string;
    expiresIn: number; 
  
    constructor(accessToken: string, expiresIn?: number) {
      this.accessToken = accessToken;
      if (expiresIn) this.expiresIn = expiresIn;
    }
  }
  