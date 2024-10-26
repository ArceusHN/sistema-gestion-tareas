import { User } from "./user.entity";

export class Task {
    constructor(
      public id: number,
      public title: string,
      public description: string,
      public status: TaskStatus = TaskStatus.PENDING,
      public user: User,
      public createdBy?: number,
      public updatedBy?: number,
      public createdAt: Date = new Date(),
      public updatedAt: Date = new Date(),
     
    ) {}
  
  }
  
  export enum TaskStatus {
    PENDING = 'pending',
    IN_PROGRESS = 'in-progress',
    COMPLETED = 'completed'
  }
  