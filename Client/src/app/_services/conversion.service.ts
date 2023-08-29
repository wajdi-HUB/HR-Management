import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Conversion } from '../_models/conversion';

@Injectable({
    providedIn: 'root',
})
export class ConversionService {
    private apiUrl = 'http://localhost:8081/GestionDesAbsences/conversions';

    constructor(private http: HttpClient) {}

    getAllConversions(): Observable<any> {
        return this.http.get(this.apiUrl);
    }

    getCurrentUserConversion(id: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/user/${id}/current`);
    }

    addConversion(conversion: Conversion): Observable<Conversion> {
        return this.http.post<Conversion>(`${this.apiUrl}/create`, conversion);
    }

    updateConversion(conversion: Conversion): Observable<Conversion> {
        return this.http.put<Conversion>(
            `${this.apiUrl}/update/${conversion.id}`,
            conversion
        );
    }

    deleteConversion(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
    }
}
