import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from 'src/app/_models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
    private apiUrl = 'http://localhost:8081/GestionDesAbsences/projects';
  constructor(private http: HttpClient) { }
  addProject(Project : Project): Observable<Project> {
    return this.http.post<Project>(`${this.apiUrl}`, Project);
}

updateProject(Project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}/${Project.id}`, Project);
}

getAllProjects(): Observable<any> {
    return this.http.get(this.apiUrl);
}
getProject(id:number): Observable<any>{
    return this.http.get(`${this.apiUrl}/${id}`);
}

removeProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
}

}
