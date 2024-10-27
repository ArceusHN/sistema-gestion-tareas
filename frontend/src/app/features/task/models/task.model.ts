import { User } from "src/app/shared/models/user.model";

export class TaskModel{
    id: number
    title: string;
    description: string;
    status: number;
    user: User;
    createdAt: Date
}