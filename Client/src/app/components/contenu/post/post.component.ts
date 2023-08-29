import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Post } from 'src/app/_models/post';
import { Comment } from 'src/app/_models/comment';
import { PostService } from 'src/app/_services/post.service';
import { CommentService } from 'src/app/_services/comment.service';
import { UserService } from 'src/app/_services/users.service';
import { ReactPost } from 'src/app/_models/react-post';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss'],
    providers: [ConfirmationService, MessageService],
})
export class PostComponent implements OnInit {
    posts: Post[] = [];
    loading: boolean = true;
    postDialog: boolean = false;
    commentDialog: boolean = false;
    post: Post = new Post();
    comment: Comment = new Comment();
    selectedPosts: Post[] = [];
    submitted: boolean = false;
    rowsPerPageOptions = [5, 10, 20];
    projectId: any;
    isAdmin: boolean = false;
    like: any;
    dislike: any;
    nbrComment: any;
    dedi: any;
    user: any;
    reactPosts: ReactPost[] = [];
    constructor(
        private postService: PostService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private commentService: CommentService,
        private userService: UserService,

        private router: Router
    ) {}

    ngOnInit(): void {
        //this.isAdmin = this.authService.isAdmin();

        this.getAll();
    }

    getAll() {
        this.postService.getAllPosts().subscribe(
            (posts) => {
                this.posts = posts;
                console.table(this.posts);
                this.loading = false;

                // Check if id is defined
            },
            (error) => {
                console.error(error);
            }
        );
    }

    openNew() {
        this.post = new Post();
        this.loading = false;
        this.postDialog = true;
        //console.log(this.post.id);
    }
    openNewComment(postId: number) {
        this.comment = new Comment();
        this.commentDialog = true;
        console.log('hhhhhhh');
        console.log('teteteet', postId);
        this.dedi = postId;
    }

    deleteSelectedPosts() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected tasks?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.posts = this.posts.filter(
                    (val) => !this.selectedPosts.includes(val)
                );
                this.selectedPosts = [];
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Tasks Deleted',
                    life: 3000,
                });
            },
        });
    }

    editTask(post: Post) {
        this.post = { ...this.post };
        this.postDialog = true;
    }

    deleteTask(post: Post) {
        if (post.id) {
            this.postService.deleteTask(post.id).subscribe(
                () => {
                    this.posts = this.posts.filter((val) => val.id !== post.id);
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Task Deleted',
                        life: 3000,
                    });
                },
                (error) => {
                    console.error(error);
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Failed to delete post',
                        life: 3000,
                    });
                }
            );
        }
    }

    hideDialog() {
        this.postDialog = false;
        this.loading = false;
        this.commentDialog = false;
    }

    savePost() {
        this.loading = true;
        this.userService.getCurrentUser().subscribe((r) => {
            this.user = r;
            console.log('triteta', this.user.id);

            this.postService.createPost(this.post, this.user.id).subscribe(
                () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Post Created',
                        life: 3000,
                    });
                    this.getAll(); // Reload all tasks from the backend
                },
                (error) => {
                    console.error(error);
                    // Handle error scenario, display error message, etc.
                }
            );

            this.postDialog = false;
            this.post = new Post();
        });
    }
    saveComment() {
        this.loading = true;
        console.log(this.dedi);
        this.commentService.getNbreComments(this.dedi).subscribe(
            (response) => {
                this.nbrComment = response + 1;
            },
            (error) => {
                console.error(error);
            }
        );

        this.commentService.createComment(this.comment, 1, this.dedi).subscribe(
            () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Post Created',
                    life: 3000,
                });
                this.getAll(); // Reload all tasks from the backend
            },
            (error: any) => {
                console.error(error);
                // Handle error scenario, display error message, etc.
            }
        );

        this.postDialog = false;
        this.post = new Post();
    }
    likePost(postId: number) {
        this.userService.getCurrentUser().subscribe((r) => {
            this.user = r;
            this.postService.getAllReactPost().subscribe((r) => {
                this.reactPosts = r;
                let reactId: number = 0;
                this.reactPosts.forEach((react) => {
                    if (react.post?.id === postId) {
                        reactId = react.id!;
                    }
                });
                this.postService
                    .likePost(reactId, postId, this.user.id)
                    .subscribe(
                        (response) => {
                            console.log(response);
                            this.like = response;
                            console.log(this.like);
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Successful',
                                detail: 'Task Deleted',
                                life: 3000,
                            });
                        },
                        (error) => {
                            console.error(error);
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error',
                                detail: 'Failed to delete post',
                                life: 3000,
                            });
                        }
                    );
            });
        });
    }
    dislikePost(postId: number) {
      this.userService.getCurrentUser().subscribe((r) => {
        this.user = r;
        this.postService.getAllReactPost().subscribe((r) => {
            this.reactPosts = r;
            let reactId: number = 0;
            this.reactPosts.forEach((react) => {
                if (react.post?.id === postId) {
                    reactId = react.id!;
                }
            });
            this.postService
                .dislikePost(reactId, postId, this.user.id)
                .subscribe(
                    (response) => {
                        console.log(response);
                        this.dislike = response;
                        console.log(this.dislike);
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Task Deleted',
                            life: 3000,
                        });
                    },
                    (error) => {
                        console.error(error);
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Failed to delete post',
                            life: 3000,
                        });
                    }
                );
        });
    });
    }
    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.posts.length; i++) {
            if (this.posts[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    }
}
