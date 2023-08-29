import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Conge, StatusOfDemand } from 'src/app/_models/conge';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/auth.service';
import { CongeService } from 'src/app/_services/conge.service';
import { UserService } from 'src/app/_services/users.service';

@Component({
    selector: 'app-conge',
    templateUrl: './conge.component.html',
    styleUrls: ['./conge.component.scss'],
    providers: [ConfirmationService, MessageService, DatePipe],
})
export class CongeComponent implements OnInit {
    NOT_YET_TREATED: any = StatusOfDemand.NOT_YET_TREATED;
    ACCEPTED: any = StatusOfDemand.ACCEPTED;
    REJECTED: any = StatusOfDemand.REJECTED;

    conges: Conge[] = [];
    loading: boolean = true;
    congeDialog: boolean = false;
    conge: Conge = new Conge();
    selectedConge: Conge[] = [];
    users: User[] = [];
    isAdmin: boolean = false;
    user: User = new User();
    soldeConge: number = 0;
    dureeConge: number = 0;
    caluleeeer: number = 1000 * 60 * 60 * 24;
    forum: any = {
        dateDebut: Date,
        dateFin: Date,
    };
    Role_Admin: string = 'ROLE_ADMIN';
    testRole: string = '';
    kchouk: any;
    today: Date = new Date();

    @ViewChild('dt') dt: Table | undefined;

    constructor(
        private congeService: CongeService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private userService: UserService,
        private datePipe: DatePipe,
        private authService: AuthService
    ) {}

    public getRole() {
        return localStorage.getItem('role');
    }
    ngOnInit(): void {
        const userRole = this.getRole();
        this.isAdmin = this.authService.isAdmin();
        this.getAll();
        this.userService.getCurrentUser().subscribe((r) => {
            this.user = r;
            this.congeService.getUserSoldeConge(this.user.id!).subscribe({
                next: (r) => {
                    console.log('testttt', this.user.id);
                    this.soldeConge = r;
                },
            });
        });
    }
    getAll() {
        console.log('testtest', this.getRole());

        if (this.getRole() == this.Role_Admin) {
            this.userService.getAllusers().subscribe((r) => {
                this.users = r;
            });
            this.congeService.getAllConges().subscribe(
                (r) => {
                    this.conges = r;
                    console.table(this.conges);
                    this.loading = false;
                },
                (e) => {
                    console.table(e);
                }
            );
        } else {
            this.userService.getCurrentUser().subscribe((r) => {
                this.user = r;
                this.userService.getUserById(this.user.id!).subscribe((r) => {
                    this.users[0] = r;
                });
            });

            this.userService.getCurrentUser().subscribe((r) => {
                this.user = r;
                this.congeService.getCongeByUserId(this.user.id!).subscribe(
                    (r) => {
                        this.conges = r;
                        console.table(this.conges);
                        this.loading = false;
                    },
                    (e) => {
                        console.table(e);
                    }
                );
            });
        }
    }

    setSoldeConge() {
        this.congeService.getUserSoldeConge(this.conge.user.id!).subscribe({
            next: (res) => {
                this.conge.soldeConge = res;
            },
        });
    }

    openNew() {
        this.conge = new Conge();
        if (!this.isAdmin) {
            this.conge.soldeConge = this.soldeConge;
        }
        this.loading = false;
        this.congeDialog = true;
    }

    deleteSelectedConge() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected conge?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.selectedConge.forEach((conge) => {
                    this.congeService.removeConge(conge.id!).subscribe((r) => {
                        this.conges = this.conges.filter(
                            (val) => !this.selectedConge.includes(val)
                        );
                        this.selectedConge = [];
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'conge Deleted',
                            life: 3000,
                        });
                    });
                });
            },
        });
    }

    editConge(conge: Conge) {
        const diffInMs =
            new Date(this.conge.dateFin).getTime() -
            new Date(this.conge.dateDebut).getTime();

        this.conge.soldeConge = this.soldeConge;
        this.conge = { ...conge };
        this.congeDialog = true;
    }

    deleteConge(conge: Conge) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + conge.id + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.congeService.removeConge(conge.id!).subscribe((r) => {
                    this.conges = this.conges.filter(
                        (val) => val.id !== conge.id
                    );
                    this.conge = new Conge();
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Conge Deleted',
                        life: 3000,
                    });
                });
            },
        });
    }

    hideDialog() {
        this.congeDialog = false;
        this.loading = false;
    }

    saveConge() {
        const diffInMs =
            new Date(this.conge.dateFin).getTime() -
            new Date(this.conge.dateDebut).getTime();

        const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
        this.conge.duree = diffInDays;
        console.log(diffInDays);
        this.conge.duree = diffInDays;
        this.conge.dateDebut = this.datePipe.transform(
            this.conge.dateDebut,
            'yyyy-MM-dd'
        );
        this.conge.dateFin = this.datePipe.transform(
            this.conge.dateFin,
            'yyyy-MM-dd'
        );
        this.conge.soldeConge = this.soldeConge;

        this.loading = true;
        if (this.conge.id) {
            this.congeService.updateConge(this.conge).subscribe({
                next: (r) => {
                    console.log('jjjjjj', this.dureeConge);
                    this.conges[this.findIndexById(r.id!)] = r;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Congé Updated',
                        life: 3000,
                    });
                },
                error: (e) => {
                    console.error(e);
                    if (e.status === 400) {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Erreur',
                            detail: 'Date de congé déjà utilisée',
                            life: 3000,
                        });
                    }
                },
            });
        } else {
            this.congeService.addConge(this.conge).subscribe({
                next: (r) => {
                    this.conges.push(r);
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Congé Created',
                        life: 3000,
                    });
                },
                error: (e: HttpErrorResponse) => {
                    console.error(e);
                    if (e.status === 400) {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Erreur',
                            detail: 'congé Invalide',
                            life: 3000,
                        });
                    }
                },
            });
        }

        this.conges = [...this.conges];
        this.congeDialog = false;
        this.conge = new Conge();
    }

    confirmation($event: any, idConge: number) {
        console.log($event);
        this.confirmationService.confirm({
            key: 'confirmation',
            target: $event.target,
            message: 'Êtes-vous sûr de vouloir valider ce congé?',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Accepter',
            rejectLabel: 'Rejeter',
            accept: () => {
                this.congeService.accepterConge(idConge).subscribe((r) => {
                    console.log(r);
                    this.conges[this.findIndexById(idConge)] = r;
                });
            },
            reject: () => {
                this.congeService.refuserConge(idConge).subscribe((r) => {
                    console.log(r);
                    this.conges[this.findIndexById(idConge)] = r;
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
        for (let i = 0; i < this.conges.length; i++) {
            if (this.conges[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    }
}
