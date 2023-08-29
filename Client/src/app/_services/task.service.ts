import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from 'src/app/_models/task';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
    private apiUrl = 'http://localhost:8081/GestionDesAbsences/tasks';
    constructor(private http: HttpClient) { }
    createTask(task: Task, projectId: number): Observable<Task> {
        return this.http.post<Task>(`${this.apiUrl}/${projectId}`, task);
      }
    
      getTaskById(id: number): Observable<Task> {
        return this.http.get<Task>(`http://localhost:8081/GestionDesAbsences/tasks/${id}`);
      }
    
      getAllTasks(): Observable<Task[]> {
        return this.http.get<Task[]>(this.apiUrl);
      }

      getTaskCount(): Observable<any> {
        return this.http.get(`${this.apiUrl}/counts`);
    }
    
      updateTask(id: number, task: Task): Observable<Task> {
        return this.http.put<Task>(`http://localhost:8081/GestionDesAbsences/tasks/${id}`, task);
      }
      updateTaskStatus(id:number):Observable<Task>{
        return this.http.get<Task>(`http://localhost:8081/GestionDesAbsences/tasks/Status/${id}`)
      }
      updateTaskStatusToTimeOut(id:number):Observable<Task>{
        return this.http.get<Task>(`http://localhost:8081/GestionDesAbsences/tasks/Status/TimeOut/${id}`)
      }
    
      deleteTask(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
      }
    
      getAllTasksByProjectId(projectId: number): Observable<Task[]> {
        return this.http.get<Task[]>(`${this.apiUrl}/project/${projectId}`);
      }
      getAllPendingTasks(): Observable<any> {
        return this.http.get(`${this.apiUrl}/count/pending`);
      }
      getAllDoneTasks(): Observable<any> {
        return this.http.get(`${this.apiUrl}/count/done`);
      }
      getAllTodoTasks(): Observable<any> {
        return this.http.get(`${this.apiUrl}/count/todo`);
      }
      getAllTimeOutTasks(): Observable<any> {
        return this.http.get(`${this.apiUrl}/count/timeout`);
      }
    
    }