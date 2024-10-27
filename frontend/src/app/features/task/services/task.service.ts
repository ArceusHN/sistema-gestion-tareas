import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TaskModel } from "../models/task.model";
import { Observable } from "rxjs";
import { TaskStatusModel } from "../models/task-status.model";
import { CreateTaskModel } from "../models/create-task.model";

@Injectable({
    providedIn: 'root'
})
export class TaskService{
    apiUrl: string = 'http://localhost:3000';

    constructor(private readonly httpClient: HttpClient){}

    getAll(): Observable<TaskModel[]>{
        const url = `${this.apiUrl}/tasks/all`;

        return this.httpClient.get<TaskModel[]>(url);
    }

    getAllTaskStatus(): Observable<TaskStatusModel[]>{
        const url = `${this.apiUrl}/task-status/all`;

        return this.httpClient.get<TaskStatusModel[]>(url);
    }

    create(createTask: CreateTaskModel): Observable<any>{
        const url = `${this.apiUrl}/tasks`;

        return this.httpClient.post(url, createTask);
    }
}