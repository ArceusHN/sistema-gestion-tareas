import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user.model";

@Injectable({
    providedIn: 'root'
})
export class UserService{
    apiUrl: string = 'http://localhost:3000';

    constructor(private readonly httpClient: HttpClient){}

    getAll(): Observable<User[]> {
        const url = `${this.apiUrl}/user/all`;

        return this.httpClient.get<User[]>(url);
    }
}