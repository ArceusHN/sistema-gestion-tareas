import { User } from "./user.entity";

export class Task {
    constructor(
      public id: number,
      public title: string,
      public description: string,
      public status: TaskStatus = TaskStatus.PENDING,
      public user: User,
      public createdAt: Date = new Date(),
      public updatedAt: Date = new Date(),
      public createdBy?: User,
      public updatedBy?: User
    ) {}
  
  }
  
  export enum TaskStatus {
    PENDING = 'pending',
    IN_PROGRESS = 'in-progress',
    COMPLETED = 'completed'
  }
  