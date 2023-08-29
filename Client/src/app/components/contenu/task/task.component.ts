
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Task } from 'src/app/_models/task';
import { Table } from 'primeng/table';
import { TaskService } from 'src/app/_services/task.service';
import { AuthService } from 'src/app/_services/auth.service';
import { ProjectService } from 'src/app/_services/project.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  loading: boolean = true;
  taskDialog: boolean = false;
  task: Task = new Task();
  selectedTasks: Task[] = [];
  submitted: boolean = false;
  rowsPerPageOptions = [5, 10, 20];
  projectId: any;
  showAlertDialog: boolean = false;
  isAdmin: boolean = false;
  @ViewChild('dt') dataTable: Table | undefined;
  filteredTasks: Task[] = [];
  projects:any;
  projectsId:any[]=[];
  today: Date = new Date();
  constructor(
    private taskService: TaskService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private authService:AuthService,
    private projectService:ProjectService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.getAll();
    this.projectService.getAllProjects().subscribe((r)=>{
      this.projects=r;
      
      for(let i = 0;i<this.projects.length;i++){
        console.log('znfeiunfiezfnelfk,ezf,lez',this.projects[i].id)
        this.projectsId[i]=this.projects[i].id;
      }
      console.log('aaaaaaaaaaaaaaaa',this.projectsId)
    })
  }

  getAll() {
    this.taskService.getAllTasks().subscribe(
      (tasks) => {
        this.tasks = tasks;
        console.table(this.tasks);
        this.filteredTasks = [...this.tasks];
        this.loading = false;
        this.checkDeadline();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  filterTasks(event: any) {
    const keyword = event.target?.value?.toLowerCase() || '';
    this.filteredTasks = this.tasks.filter(task =>
      task.taskName && task.taskName.toLowerCase().includes(keyword)
    );
    if (this.dataTable) {
      this.dataTable.reset();
    }
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

  editStatus(task: Task) {
    if (task.id) {
      task.taskStatus = 'Done';
      this.taskService.updateTaskStatus(task.id).subscribe(
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
    }
    this.task = new Task();
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
      if (this.task.startDate && new Date(this.task.startDate).toDateString() === new Date().toDateString()) {
        this.task.taskStatus = 'Pending';
      } else {
        this.task.taskStatus = 'TODO';
      }
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
      if (this.task.startDate && new Date(this.task.startDate).toDateString() === new Date().toDateString()) {
        this.task.taskStatus = 'Pending';
      } else {
        this.task.taskStatus = 'TODO';
      }
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


checkDeadline() {
    const today = new Date();
    for (let i = 0; i < this.tasks.length; i++) {
      const task = this.tasks[i];
      if (task && task.deadline) {
        const deadlineDate = new Date(task.deadline);
        const timeDifference = deadlineDate.getTime() - today.getTime();
        const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
        if (daysDifference <= 7 && daysDifference >= 1 && task.taskStatus == "Pending") {
          this.showAlertDialog = true;
          console.log("hbesjhbezbfszuiohfzelzuifh");
          //break;
        }
        if(daysDifference <= 1 && task.taskStatus == "Pending"){
            console.log('Task is due Today!');
            console.log("hbesjhbezbfszuiohfzelzuifh");
            if (task.id) {
              this.taskService.updateTaskStatusToTimeOut(task.id).subscribe(
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
            }
            break;
        }
      }
    }
  }
  

  showAlert(task: any) {
    console.log("Alert clicked!", task);
  }

  hideAlert() {
    this.showAlertDialog = false;
  }
}
