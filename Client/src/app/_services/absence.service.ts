import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Absence } from '../_models/absence';
import { Presence } from '../_models/presence';

@Injectable({
    providedIn: 'root',
})
export class AbsenceService {
    private apiUrl = 'http://localhost:8081/GestionDesAbsences/abscences';

    constructor(private http: HttpClient) {}

    getAllAbsences(): Observable<any> {
        return this.http.get(this.apiUrl);
    }

    getCurrentMonthAbsences(id: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/user/${id}/current`);
    }

    getUserAbsencesByRange(id: number, weekEntry: Presence): Observable<any> {
        return this.http.post(`${this.apiUrl}/user/${id}/range`, weekEntry);
    }

    addAbsence(absence: Absence): Observable<Absence> {
        return this.http.post<Absence>(`${this.apiUrl}/create`, absence);
    }

    updateAbsence(absence: Absence): Observable<Absence> {
        return this.http.put<Absence>(
            `${this.apiUrl}/update/${absence.id}`,
            absence
        );
    }

    deleteAbsence(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
    }
}
