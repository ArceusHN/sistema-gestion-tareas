import { User } from "./user.entity";

export class Task {
    constructor(
      public id: number,
      public title: string,
      public description: string,
      public status: number = Number(TaskStatusEnum.PENDING),
      public user: User,
      public createdBy?: number,
      public updatedBy?: number,
      public createdAt: Date = new Date(),
      public updatedAt: Date = new Date(),
     
    ) {}
  
  }
  
  export enum TaskStatusEnum {
    PENDING = 1,
    IN_PROGRESS,
    COMPLETED
  }
  