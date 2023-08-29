import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Holiday } from "../_models/holiday";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class HolidayService {
  private apiUrl = "http://localhost:8081/GestionDesAbsences/holidays";

  constructor(private http: HttpClient) {}

  getAllHolidays(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getCurrentMonthHolidays(): Observable<any> {
    return this.http.get(`${this.apiUrl}/current`);
  }

  addHoliday(holiday: Holiday): Observable<Holiday> {
    return this.http.post<Holiday>(`${this.apiUrl}/create`, holiday);
  }

  updateHoliday(holiday: Holiday): Observable<Holiday> {
    return this.http.put<Holiday>(
      `${this.apiUrl}/update/${holiday.id}`,
      holiday
    );
  }

  deleteHoliday(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
