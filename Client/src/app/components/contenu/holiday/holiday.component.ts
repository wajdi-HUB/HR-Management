import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Holiday } from 'src/app/_models/holiday';
import { HolidayService } from 'src/app/_services/holiday.service';

@Component({
    selector: 'app-holiday',
    templateUrl: './holiday.component.html',
    styleUrls: ['./holiday.component.scss'],
    providers: [ConfirmationService, MessageService, DatePipe],
})
export class HolidayComponent implements OnInit {
    holidays: Holiday[] = [];
    selectedHolidays: Holiday[] = [];
    holidayDialog: boolean = false;
    holiday: Holiday = new Holiday();
    rangeDates: Date[] = [];

    @ViewChild('dt') dt: Table | undefined;

    constructor(
        private holidayService: HolidayService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private datePipe: DatePipe
    ) {}

    ngOnInit(): void {
        this.holidayService.getAllHolidays().subscribe({
            next: (res) => {
                this.holidays = res;
            },
            error: (err) => {
                console.error(err);
            },
        });
    }

    openNew() {
        this.holiday = new Holiday();
        this.selectedHolidays = [];
        this.holidayDialog = true;
    }

    hideDialog() {
        this.holidayDialog = false;
    }

    editHoliday(holiday: Holiday) {
        this.holiday = { ...holiday };
        this.rangeDates[0] = new Date(holiday.startDate);
        this.rangeDates[1] = new Date(holiday.endDate);
        this.holidayDialog = true;
    }

    saveHoliday() {
        this.holiday.startDate = this.datePipe.transform(
            this.rangeDates[0],
            'yyyy-MM-dd'
        );
        this.holiday.endDate = this.datePipe.transform(
            this.rangeDates[1],
            'yyyy-MM-dd'
        );
        if (this.holiday.id) {
            this.holidayService.updateHoliday(this.holiday).subscribe({
                next: (r) => {
                    this.holidays[this.findIndexById(r.id)] = r;
                    this.createAlert(
                        'success',
                        'Succés',
                        'Jour férié modifié avec succés!'
                    );
                },
                error: (e: HttpErrorResponse) => {
                    if (e.status === 400) {
                        this.createAlert(
                            'error',
                            'Erreur',
                            'Date existe déjà!'
                        );
                    } else {
                        this.createAlert(
                            'error',
                            'Erreur',
                            'Erreur de modification!'
                        );
                    }
                },
            });
        } else {
            this.holidayService.addHoliday(this.holiday).subscribe({
                next: (r) => {
                    this.holidays.push(r);
                    this.createAlert(
                        'success',
                        'Succés',
                        'Jour férié créé avec succés!'
                    );
                },
                error: (e: HttpErrorResponse) => {
                    if (e.status === 400) {
                        this.createAlert(
                            'error',
                            'Erreur',
                            'Date existe déjà!'
                        );
                    } else {
                        this.createAlert(
                            'error',
                            'Erreur',
                            'Erreur de création!'
                        );
                    }
                },
            });
        }

        this.holidays = [...this.holidays];
        this.holidayDialog = false;
        this.holiday = new Holiday();
    }

    deleteHoliday(holiday: Holiday) {
        this.confirmationService.confirm({
            message: 'Êtes-vous sûr de vouloir supprimer ' + holiday.name + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.holidayService.deleteHoliday(holiday.id!).subscribe({
                    next: () => {
                        this.holidays = this.holidays.filter(
                            (val) => val.id !== holiday.id
                        );
                    },
                });
            },
        });
    }

    deleteSelectedHolidays() {
        this.confirmationService.confirm({
            message:
                'Êtes-vous sûr de vouloir supprimer les jours fériés sélectionnés?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.selectedHolidays.forEach((holiday) => {
                    this.holidayService
                        .deleteHoliday(holiday.id!)
                        .subscribe(() => {
                            this.holidays = this.holidays.filter(
                                (val) => !this.selectedHolidays.includes(val)
                            );
                            this.selectedHolidays = [];
                            this.createAlert(
                                'success',
                                'Succés',
                                `Jour férié ${holiday.name} supprimé`
                            );
                        });
                });
            },
        });
    }

    createAlert(severity: string, summary: string, detail: string) {
        this.messageService.add({
            severity: severity,
            summary: summary,
            detail: detail,
            life: 3000,
        });
    }

    getDatesFromRange(start: Date, end: Date) {
        const cFrom = new Date(start);
        const cTo = new Date(end);
        let daysArr = [new Date(cFrom)];
        let tempDate = cFrom;
        while (tempDate < cTo) {
            tempDate.setUTCDate(tempDate.getUTCDate() + 1);
            daysArr.push(new Date(tempDate));
        }
        return daysArr;
    }

    applyFilterGlobal($event: any, stringVal: any) {
        this.dt!.filterGlobal(
            ($event.target as HTMLInputElement).value,
            stringVal
        );
    }

    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.holidays.length; i++) {
            if (this.holidays[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    }
}
