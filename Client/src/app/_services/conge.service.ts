import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Conge } from '../_models/conge';
import { User } from 'src/app/_models/user';

@Injectable({
    providedIn: 'root',
})
export class CongeService {
    user: User = new User();
    private apiUrl = 'http://localhost:8081/GestionDesAbsences/conges/';

    constructor(private http: HttpClient) {}

    addConge(conge: Conge): Observable<Conge> {
        return this.http.post<Conge>(`${this.apiUrl}`, conge);
    }

    updateConge(conge: Conge): Observable<Conge> {
        return this.http.put<Conge>(`${this.apiUrl}${conge.id}`, conge);
    }

    getAllConges(): Observable<any> {
        return this.http.get(this.apiUrl);
    }

    getAllCurrentConges(id: number): Observable<any> {
        return this.http.get(`${this.apiUrl}user/${id}`);
    }

    getLatestConge(id: number): Observable<any> {
        return this.http.get(`${this.apiUrl}user/${id}/latest`);
    }

    getSoldeConge(id: number): Observable<any> {
        return this.http.get(`${this.apiUrl}user/${id}/solde`);
    }

    getUserSoldeConge(id: number): Observable<any> {
        return this.http.get(`${this.apiUrl}user/${id}/soldess`);
    }

    calculerDureeConge(id: number): Promise<number> {
        const apiUrl = `${this.apiUrl}${id}/duree`; 

        return this.http
            .get<number | undefined>(apiUrl)
            .toPromise()
            .then((response: number | undefined) => {
                if (response === undefined) {
                    throw new Error('API response is undefined');
                }
                return response;
            });
    }

    removeConge(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}${id}`);
    }

   
    getCongeCount(): Observable<any> {
        return this.http.get(`${this.apiUrl}count`);
    }

    accepterConge(id: number): Observable<any> {
        return this.http.post(`${this.apiUrl}${id}/accepter`, '');
    }

    refuserConge(id: number): Observable<any> {
        return this.http.post(`${this.apiUrl}${id}/refuser`, '');
    }
    getCongeByUserId(userId:number):Observable<any>{
        return this.http.get(`${this.apiUrl}test/${userId}`)
    }
}
