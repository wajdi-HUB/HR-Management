import { Post } from "./post";
import { User } from "./user";

export class Comment {
    id ?:number;
    content?:string;
    user?:User;
    post?:Post
}
