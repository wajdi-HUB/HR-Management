import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:8081/GestionDesAbsences/users/';

  constructor(private http: HttpClient, private router: Router) {}

  addUser(user: User): Observable<User> {
      return this.http.post<User>(`${this.apiUrl}ajouterUser`, user);
  }

  updateUser(user: User): Observable<User> {
      return this.http.put<User>(`${this.apiUrl}updateUser/${user.id}`, user);
  }

  profile (){
    //window.localStorage.clear();
    //this.updateLoggedInState(false);
    this.router.navigateByUrl('/profile');
    
  }
  getAllusers(): Observable<any> {
      return this.http.get(this.apiUrl);
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
}
