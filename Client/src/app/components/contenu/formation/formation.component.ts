import { Component, OnInit } from '@angular/core';
import { Formation } from 'src/app/_models/formation';

import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { FormationService } from 'src/app/_services/formation.service';
import { AuthService } from 'src/app/_services/auth.service';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/users.service';

@Component({
    selector: 'app-formation',
    templateUrl: './formation.component.html',
    styleUrls: ['./formation.component.scss'],
    providers: [ConfirmationService, MessageService],
})
export class FormationComponent implements OnInit {
    formations: Formation[] = [];
    loading: boolean = true;
    formationDialog: boolean = false;
    formation: Formation = new Formation();
    selectedFormations: Formation[] = [];
    submitted: boolean = false;
    rowsPerPageOptions = [5, 10, 20];
    isAdmin: boolean = false;
    membersInput: string = '';
    users: User[] = [];
    selectedUsers: User[] = [];
    today: Date = new Date();
    constructor(
        private formationService: FormationService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private authService: AuthService,
        private userService: UserService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.isAdmin = this.authService.isAdmin();
        this.getAll();
        this.userService.getAllusers().subscribe((r) => {
            this.users = r;
        });
    }
    getAll() {
        this.formationService.getAllFormations().subscribe(
            (r) => {
                this.formations = r;
                console.table(this.formations);
                this.loading = false;
            },
            (e) => {
                console.error(e);
            }
        );
    }
    getFormationsByName(formationName: string) {
        this.formationService.getFormationsByName(formationName).subscribe(
            (response: any) => {
                this.formations = response; // Assign the retrieved formations to the variable
            },
            (error: any) => {
                console.error('Error retrieving formations:', error);
            }
        );
    }

    openNew() {
        this.formation = new Formation();
        this.loading = false;
        this.formationDialog = true;
    }

    deleteSelectedFormations() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected formations?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.formations = this.formations.filter(
                    (val) => !this.selectedFormations.includes(val)
                );
                this.selectedFormations = [];
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Formations Deleted',
                    life: 3000,
                });
            },
        });
    }

    editFormation(formation: Formation) {
        this.formation = { ...formation };
        this.formationDialog = true;
    }

    deleteFormation(formation: Formation) {
        if (formation.id) {
            this.formationService.removeFormation(formation.id).subscribe(
                () => {
                    this.formations = this.formations.filter(
                        (val) => val.id !== formation.id
                    );
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Formation Deleted',
                        life: 3000,
                    });
                },
                (error) => {
                    console.error(error);
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Failed to delete formation',
                        life: 3000,
                    });
                }
            );
        }
    }

    hideDialog() {
        this.formationDialog = false;
        this.loading = false;
    }

    saveFormation() {
        this.loading = true;
        this.selectedUsers.forEach((user) => {
            this.membersInput= this.membersInput + user.email + ',';
        });
        console.log(this.membersInput);
        
        if (this.membersInput) {
            this.formation.members = this.membersInput.split(',');
        } else {
            this.formation.members = [];
        }
        if (this.formation.id) {
            // Update existing formation
            this.formationService.updateFormation(this.formation).subscribe(
                () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Formation Updated',
                        life: 3000,
                    });
                    this.getAll(); // Reload all formations from the backend
                },
                (error) => {
                    console.error(error);
                    // Handle error scenario, display error message, etc.
                }
            );
        } else {
            // Add new formation
            this.formationService.addFormation(this.formation).subscribe(
                () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Formation Created',
                        life: 3000,
                    });
                    this.getAll(); // Reload all formations from the backend
                },
                (error) => {
                    console.error(error);
                    // Handle error scenario, display error message, etc.
                }
            );
        }

        this.formationDialog = false;
        this.formation = new Formation();
    }

    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.formations.length; i++) {
            if (this.formations[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    }
    // navigateToComponent(formationId:number):void {
    //     this.formationService.getFormation(formationId).subscribe((formation: any) => {
    //         const formationName = formation.formationName;
    //         console.log(formationId)
    //         console.log(formationName)
    //         this.router.navigate(['/contenu/formation/meet'], { state: { formationName } });
    //       });
    //   }
    navigateToComponent(formationId: number): void {
        this.formationService
            .getFormation(formationId)
            .subscribe((formation: any) => {
                const formationName = formation.formationName;
                this.router.navigate([
                    '/contenu/formation/meet',
                    formationName,
                ]); // Pass formationName as route parameter
            });
    }
}
