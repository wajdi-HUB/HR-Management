import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { StatusOfDemand } from 'src/app/_models/conge';
import { Conversion } from 'src/app/_models/conversion';
import { ConversionService } from 'src/app/_services/conversion.service';

@Component({
    selector: 'app-conversion',
    templateUrl: './conversion.component.html',
    styleUrls: ['./conversion.component.scss'],
    providers: [ConfirmationService, MessageService],
})
export class ConversionComponent implements OnInit {
    NOT_YET_TREATED: any = StatusOfDemand.NOT_YET_TREATED;
    ACCEPTED: any = StatusOfDemand.ACCEPTED;
    REJECTED: any = StatusOfDemand.REJECTED;
    statuses: StatusOfDemand[] = [];

    conversions: Conversion[] = [];
    selectedConversions: Conversion[] = [];
    conversion: Conversion = new Conversion();
    conversionDialog: boolean = false;
    @ViewChild('dt') dt: Table | undefined;

    constructor(
        private conversionService: ConversionService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.statuses.push(this.NOT_YET_TREATED, this.ACCEPTED, this.REJECTED);
        this.conversionService.getAllConversions().subscribe({
            next: (res) => {
                this.conversions = res;
            },
            error: (err) => {
                console.error(err);
            },
        });
    }

    openNew() {
        this.conversion = new Conversion();
        this.selectedConversions = [];
        this.conversionDialog = true;
    }

    hideDialog() {
        this.conversionDialog = false;
    }

    editConversion(conversion: Conversion) {
        this.conversion = { ...conversion };
        this.conversionDialog = true;
    }

    saveConversion() {
        if (this.conversion.id) {
            this.conversionService.updateConversion(this.conversion).subscribe({
                next: (r) => {
                    this.conversions[this.findIndexById(r.id)] = r;
                    this.createAlert(
                        'success',
                        'Succés',
                        'Demande modifiée avec succés!'
                    );
                },
                error: (e: HttpErrorResponse) => {
                    console.error(e);
                    this.createAlert(
                        'error',
                        'Erreur',
                        'Erreur de modification!'
                    );
                },
            });
        }
        this.conversions = [...this.conversions];
        this.conversionDialog = false;
        this.conversion = new Conversion();
    }

    deleteConversion(conversion: Conversion) {
        this.confirmationService.confirm({
            message: 'Êtes-vous sûr de vouloir supprimer cette demande?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.conversionService
                    .deleteConversion(conversion.id!)
                    .subscribe({
                        next: () => {
                            this.conversions = this.conversions.filter(
                                (val) => val.id !== conversion.id
                            );
                        },
                    });
            },
        });
    }

    deleteSelectedConversions() {
        this.confirmationService.confirm({
            message:
                'Êtes-vous sûr de vouloir supprimer les demandes sélectionnées?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.selectedConversions.forEach((conversion) => {
                    this.conversionService
                        .deleteConversion(conversion.id!)
                        .subscribe(() => {
                            this.conversions = this.conversions.filter(
                                (val) => !this.selectedConversions.includes(val)
                            );
                            this.selectedConversions = [];
                            this.createAlert(
                                'success',
                                'Succés',
                                `Demande supprimée`
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

    applyFilterGlobal($event: any, stringVal: any) {
        this.dt!.filterGlobal(
            ($event.target as HTMLInputElement).value,
            stringVal
        );
    }

    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.conversions.length; i++) {
            if (this.conversions[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    }
}
