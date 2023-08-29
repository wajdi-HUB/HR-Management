import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from '../_models/comment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

    private apiUrl = 'http://localhost:8081/GestionDesAbsences/comments';
    constructor(private http: HttpClient) { }
    createComment(comment: Comment, userId: number,postId: number): Observable<Comment> {
        return this.http.post<Comment>(`${this.apiUrl}/${userId}/${postId}`, comment);
      }

      getCommentById(id: number): Observable<Comment> {
        return this.http.get<Comment>(`${this.apiUrl}/${id}`);
      }
//GET http://localhost:8081/Posts/posts/Posts
      getAllComments(): Observable<Comment[]> {
        return this.http.get<Comment[]>(`${this.apiUrl}/comments`);
      }

      updateTask(id: number, task: Task): Observable<Task> {
        return this.http.put<Task>(`${this.apiUrl}/${id}`, task);
      }

      deleteTask(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
      }

      getAllPostsByUserId(userId: number): Observable<Comment[]> {
        return this.http.get<Comment[]>(`${this.apiUrl}/user/${userId}`);
      }
      getNbreComments(postId:number):Observable<any>{
        return this.http.get<any>(`${this.apiUrl}/nbre/${postId}`);
      }

    }
