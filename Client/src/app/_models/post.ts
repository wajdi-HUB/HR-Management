import { User } from "./user";

export class Post {
    id?:number;
    title?:string;
    content?:string;
    user?:User;
}
