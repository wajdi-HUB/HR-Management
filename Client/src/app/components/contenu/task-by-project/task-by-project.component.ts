import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Task } from 'src/app/_models/task';
import { TaskService } from 'src/app/_services/task.service';


@Component({
  selector: 'app-task-by-project',
  templateUrl: './task-by-project.component.html',
  styleUrls: ['./task-by-project.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class TaskByProjectComponent implements OnInit {

    tasks: Task[] = [];
    loading: boolean = true;
    taskDialog: boolean = false;
    task: Task = new Task();
    selectedTasks: Task[] = [];
    submitted: boolean = false;
    rowsPerPageOptions = [5, 10, 20];
    projectId:any;
  
    constructor(
      private taskService: TaskService,
      private messageService: MessageService,
      private confirmationService: ConfirmationService,
      private router: Router,
      private route: ActivatedRoute
    ) { }
  
    ngOnInit(): void {
             this.route.params.subscribe(params => {
             this.projectId = params['projectId'];
            console.log(this.projectId);// Use the project ID to load the relevant tasks or perform any other actions
          });
        this.getAll();
        

    }
    
    getAll() {
      this.taskService.getAllTasksByProjectId(this.projectId).subscribe(
        (tasks) => {
          this.tasks = tasks;
          console.table(this.tasks);
          this.loading = false;
        },
        (error) => {
          console.error(error);
        }
      );
    }
  
    openNew() {
      this.task = new Task();
      this.loading = false;
      this.taskDialog = true;
    }
  
    deleteSelectedTasks() {
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete the selected tasks?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.tasks = this.tasks.filter((val) => !this.selectedTasks.includes(val));
          this.selectedTasks = [];
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Tasks Deleted',
            life: 3000,
          });
        },
      });
    }
  
    editTask(task: Task) {
      this.task = { ...task };
      this.taskDialog = true;
    }
  
    deleteTask(task: Task) {
      if (task.id) {
        this.taskService.deleteTask(task.id).subscribe(
          () => {
            this.tasks = this.tasks.filter((val) => val.id !== task.id);
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
              detail: 'Failed to delete task',
              life: 3000,
            });
          }
        );
      }
    }
  
    hideDialog() {
      this.taskDialog = false;
      this.loading = false;
    }
  
    saveTask() {
      this.loading = true;
  
      if (this.task.id) {
        // Update existing task
        this.taskService.updateTask(this.task.id, this.task).subscribe(
          () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Task Updated',
              life: 3000,
            });
            this.getAll(); // Reload all tasks from the backend
          },
          (error) => {
            console.error(error);
            // Handle error scenario, display error message, etc.
          }
        );
      } else {
        // Add new task
        this.taskService.createTask(this.task, this.projectId).subscribe(
          () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Task Created',
              life: 3000,
            });
            this.getAll(); // Reload all tasks from the backend
          },
          (error) => {
            console.error(error);
            // Handle error scenario, display error message, etc.
          }
        );
      }
  
      this.taskDialog = false;
      this.task = new Task();
    }
  
    findIndexById(id: number): number {
      let index = -1;
      for (let i = 0; i < this.tasks.length; i++) {
        if (this.tasks[i].id === id) {
          index = i;
          break;
        }
      }
      return index;
    }

  
    // navigateToComponent(taskId: number): void {
    //   this.taskService.getTaskById(taskId).subscribe((task: any) => {
    //     const taskName = task.taskName;
    //     this.router.navigate(['/contenu/task/meet', taskName]); // Pass taskName as route parameter
    //   });
    // }
  }
  
  
  
  
  
  
  
  