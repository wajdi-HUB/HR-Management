import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Project } from 'src/app/_models/project';
import { ProjectService } from 'src/app/_services/project.service';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ProjectComponent implements OnInit {
    projects: Project[] = [];
    loading: boolean = true;
    projectDialog: boolean = false;
    project: Project = new Project();
    selectedProjects: Project[] = [];
    submitted: boolean = false;
    rowsPerPageOptions = [5, 10, 20];
  constructor(
    private projectService: ProjectService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAll();
  }
  getAll() {
    this.projectService.getAllProjects().subscribe(
        (r) => {
            this.projects = r;
            console.table(this.projects);
            this.loading = false;
        },
        (e) => {
            console.error(e);
        }
    );
}

openNew() {
    this.project = new Project();
    this.loading = false;
    this.projectDialog = true;
}

deleteSelectedProjects() {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the selected projects?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.projects = this.projects.filter(
                (val) => !this.selectedProjects.includes(val)
            );
            this.selectedProjects = [];
            this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Projects Deleted',
                life: 3000,
            });
        },
    });
}

editProject(project: Project) {
    this.project = { ...project };
    this.projectDialog = true;
}


deleteProject(project: Project) {
    if (project.id) {
      this.projectService.removeProject(project.id).subscribe(
        () => {
          this.projects = this.projects.filter((val) => val.id !== project.id);
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Project Deleted',
            life: 3000,
          });
        },
        (error) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete project',
            life: 3000,
          });
        }
      );
    }
  }



hideDialog() {
    this.projectDialog = false;
    this.loading = false;
}


saveProject() {
    this.loading = true;

    if (this.project.id) {
        // Update existing project
        this.projectService.updateProject(this.project).subscribe(
            () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Project Updated',
                    life: 3000,
                });
                this.getAll(); // Reload all projets from the backend
            },
            (error) => {
                console.error(error);
                // Handle error scenario, display error message, etc.
            }
        );
    } else {
        // Add new project
        this.projectService.addProject(this.project).subscribe(
            () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Project Created',
                    life: 3000,
                });
                this.getAll(); // Reload all projects from the backend
            },
            (error) => {
                console.error(error);
                // Handle error scenario, display error message, etc.
            }
        );
    }

    this.projectDialog = false;
    this.project = new Project();
}




findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.projects.length; i++) {
        if (this.projects[i].id === id) {
            index = i;
            break;
        }
    }
    return index;
}
findTaskByProject(project: Project) {
    if (project.id) {
      this.router.navigate(['/contenu/task', project.id]);
    }
  }
// navigateToComponent(formationId:number):void {
//     this.formationService.getFormation(formationId).subscribe((formation: any) => {
//         const formationName = formation.formationName;
//         console.log(formationId)
//         console.log(formationName)
//         this.router.navigate(['/contenu/formation/meet'], { state: { formationName } });
//       });
//   }
// navigateToComponent(formationId: number): void {
//     this.formationService.getFormation(formationId).subscribe((formation: any) => {
//         const formationName = formation.formationName;
//         this.router.navigate(['/contenu/formation/meet', formationName]); // Pass formationName as route parameter
//     });
// }

}