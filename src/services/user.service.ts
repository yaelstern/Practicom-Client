import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import User from "src/models/User";
@Injectable({
    providedIn: 'root'
})
export default class UserService {
    constructor(public http: HttpClient) { }
    routeUrl = `${environment.baseUrl}/User`;
    GetAllUsers() {
        return this.http.get<User[]>(this.routeUrl)
    }
    GetUserById(id: number) {
        return this.http.get<User>(`${this.routeUrl}/${id}`)
    }
    AddUser(user: User) {
        return this.http.post<User>(`${this.routeUrl}`, user);
    }
}