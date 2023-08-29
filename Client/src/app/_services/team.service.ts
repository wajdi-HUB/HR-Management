import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Team } from '../_models/team';
import { Observable } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
    providedIn: 'root',
})
export class TeamService {
    private apiUrl = 'http://localhost:8081/GestionDesAbsences/teams/';

    constructor(private http: HttpClient) {}

    addTeam(team: Team): Observable<Team> {
        return this.http.post<Team>(`${this.apiUrl}`, team);
    }

    updateTeam(team: Team): Observable<Team> {
        return this.http.put<Team>(`${this.apiUrl}${team.id}`, team);
    }

    addUserToTeam(teamId: number, user: User) {
        return this.http.post<Team>(`${this.apiUrl}${teamId}`, user);
    }

    getAllTeams(): Observable<any> {
        return this.http.get(this.apiUrl);
    }

    removeTeam(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}${id}`);
    }
}
