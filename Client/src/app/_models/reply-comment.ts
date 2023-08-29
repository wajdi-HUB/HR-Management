import { Comment } from "./comment";
import { User } from "./user";

export class ReplyComment {
    id?: number;
    content?:string;
    user?:User;
    comment?:Comment;
}
