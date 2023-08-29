import { Post } from "./post";
import { User } from "./user";

export class ReactPost {
    id?:number;
    like?:number;
    dislike?:number;
    user?:User;
    post?:Post;
}
