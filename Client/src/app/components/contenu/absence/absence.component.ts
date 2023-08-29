import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Absence } from 'src/app/_models/absence';
import { User } from 'src/app/_models/user';
import { AbsenceService } from 'src/app/_services/absence.service';
import { UserService } from 'src/app/_services/users.service';

@Component({
    selector: 'app-absence',
    templateUrl: './absence.component.html',
    styleUrls: ['./absence.component.scss'],
    providers: [ConfirmationService, MessageService, DatePipe],
})
export class AbsenceComponent implements OnInit {
    absences: Absence[] = [];
    selectedAbsences: Absence[] = [];
    absenceDialog: boolean = false;
    editing: boolean = false;
    absence: Absence = new Absence();
    employees: User[] = [];
    @ViewChild('dt') dt: Table | undefined;

    constructor(
        private absenceService: AbsenceService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private datePipe: DatePipe,
        private userService: UserService
    ) {}

    ngOnInit(): void {
        this.userService.getAllusers().subscribe({
            next: (r) => {
                this.employees = r;
            },
        });
        this.absenceService.getAllAbsences().subscribe({
            next: (res) => {
                this.absences = res;
            },
            error: (err) => {
                console.error(err);
            },
        });
    }

    openNew() {
        this.absence = new Absence();
        this.selectedAbsences = [];
        this.absenceDialog = true;
        this.editing = false;
    }

    hideDialog() {
        this.absenceDialog = false;
    }

    editAbsence(absence: Absence) {
        absence.dateAbsence = new Date(absence.dateAbsence);
        this.editing = true;
        this.absence = { ...absence };
        this.absenceDialog = true;
    }

    saveAbsence() {
        this.absence.dateAbsence = this.datePipe.transform(
            this.absence.dateAbsence,
            'yyyy-MM-dd'
        );
        if (this.absence.id) {
            this.absenceService.updateAbsence(this.absence).subscribe({
                next: (r) => {
                    this.absences[this.findIndexById(r.id)] = r;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Absence modifiée avec succés!',
                        life: 3000,
                    });
                },
                error: () => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Erreur',
                        detail: 'Il y a eu une erreur!',
                        life: 3000,
                    });
                },
            });
        } else {
            this.absenceService.addAbsence(this.absence).subscribe({
                next: (r) => {
                    this.absences.push(r);
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Absence créée avec succés!',
                        life: 3000,
                    });
                },
                error: (e: HttpErrorResponse) => {
                    if (e.status === 400) {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Erreur',
                            detail: 'Date existe déjà!',
                            life: 3000,
                        });
                    } else {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Erreur',
                            detail: 'Erreur de création!',
                            life: 3000,
                        });
                    }
                },
            });
        }

        this.absences = [...this.absences];
        this.absenceDialog = false;
        this.editing = false;
        this.absence = new Absence();
    }

    deleteAbsence(absence: Absence) {
        this.confirmationService.confirm({
            message: 'Êtes-vous sûr de vouloir supprimer cette absence?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.absenceService.deleteAbsence(absence.id!).subscribe({
                    next: () => {
                        this.absences = this.absences.filter(
                            (val) => val.id !== absence.id
                        );
                    },
                });
            },
        });
    }

    deleteSelectedAbsences() {
        this.confirmationService.confirm({
            message:
                'Êtes-vous sûr de vouloir supprimer les jours fériés sélectionnés?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.selectedAbsences.forEach((absence) => {
                    this.absenceService
                        .deleteAbsence(absence.id!)
                        .subscribe(() => {
                            this.absences = this.absences.filter(
                                (val) => !this.selectedAbsences.includes(val)
                            );
                            this.selectedAbsences = [];
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Successful',
                                detail: `Absence supprimée`,
                                life: 3000,
                            });
                        });
                });
            },
        });
    }

    applyFilterGlobal($event: any, stringVal: any) {
        this.dt!.filterGlobal(
            ($event.target as HTMLInputElement).value,
            stringVal
        );
    }

    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.absences.length; i++) {
            if (this.absences[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    }
}
