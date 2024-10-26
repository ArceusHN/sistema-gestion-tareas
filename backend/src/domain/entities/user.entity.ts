import { Role } from "./role.entity";

export class User {
    constructor(
      public id: number,
      public username: string,
      public password: string,
      public isPasswordEncrypted: boolean,
      public role: Role,
      public createdAt: Date = new Date(),
      public updatedAt: Date = new Date(),
      public createdBy?: User,
      public updatedBy?: User
    ) {}
  }
  