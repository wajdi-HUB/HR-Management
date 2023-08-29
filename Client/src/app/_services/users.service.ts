import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/_models/user';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private apiUrl = 'http://localhost:8081/GestionDesAbsences/users/';

    constructor(private http: HttpClient) {}

    addUser(user: User): Observable<User> {
        return this.http.post<User>(`${this.apiUrl}ajouterUser`, user); // badalt user b User
    }

    resetPassword(email: string): Observable<User> {
        return this.http.post<User>(`${this.apiUrl}reset`, email);
    }

    updateUser(user: User): Observable<User> {
        console.log('password in service ' + user.password);
        return this.http.put<User>(`${this.apiUrl}updateUser/${user.id}`, user);
    }

    updateUserPassword(user: User, password: string): Observable<User> {
        console.log('password in service ' + user.password);
        return this.http.put<User>(
            `${this.apiUrl}updateUserPassword/${user.id}`,
            password
        );
    }

    getAllusers(): Observable<any> {
        return this.http.get(this.apiUrl);
    }
    getUserCount(): Observable<any> {
        return this.http.get(`${this.apiUrl}count`);
    }
    getCurrentUser(): Observable<any> {
        return this.http.get(`${this.apiUrl}current`);
    }

    removeUser(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}removeuser/${id}`);
    }

    blockUser(userId: number): Observable<User> {
        return this.http.put<User>(`${this.apiUrl}${userId}/block`, null);
    }

    unblockUser(userId: number): Observable<User> {
        return this.http.put<User>(`${this.apiUrl}${userId}/unblock`, null);
    }
    getUserById(userId:number):Observable<User>{
        return this.http.get<User>(`${this.apiUrl}conge/user/${userId}`)
    }
    countAdmin():Observable<any>{
        return this.http.get(`${this.apiUrl}count/admin`);
    }
    countUser():Observable<any>{
        return this.http.get(`${this.apiUrl}count/user`);
    }
}
