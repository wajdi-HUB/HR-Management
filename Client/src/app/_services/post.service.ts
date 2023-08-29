import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../_models/post';
import { NumberInput } from '@angular/cdk/coercion';
import { ReactPost } from '../_models/react-post';
@Injectable({
  providedIn: 'root'
})
export class PostService {
    private apiUrl = 'http://localhost:8081/GestionDesAbsences/posts';
    constructor(private http: HttpClient) { }
    createPost(post: Post, userId: number): Observable<Post> {
        return this.http.post<Post>(`${this.apiUrl}/${userId}`, post);
      }

      getPostById(id: number): Observable<Post> {
        return this.http.get<Post>(`${this.apiUrl}/${id}`);
      }
//GET http://localhost:8081/Posts/posts/Posts
      getAllPosts(): Observable<Post[]> {
        return this.http.get<Post[]>(`${this.apiUrl}/Posts`);
      }

      updateTask(id: number, task: Task): Observable<Task> {
        return this.http.put<Task>(`${this.apiUrl}/${id}`, task);
      }

      deleteTask(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
      }

      getAllPostsByUserId(userId: number): Observable<Post[]> {
        return this.http.get<Post[]>(`${this.apiUrl}/user/${userId}`);
      }
      likePost(id:number,postId:number,userId:number) : Observable<ReactPost[]>{
        return this.http.get<ReactPost[]>(`http://localhost:8081/GestionDesAbsences/react-posts/like/${id}/${postId}/${userId}`)
      }
      dislikePost(id:number,postId:number,userId:number) : Observable<ReactPost[]>{
        return this.http.get<ReactPost[]>(`http://localhost:8081/GestionDesAbsences/react-posts/dislike/${id}/${postId}/${userId}`)
      }
      getAllReactPost():Observable<any>{
        return this.http.get('http://localhost:8081/GestionDesAbsences/react-posts');
      }
    }
