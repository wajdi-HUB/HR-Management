import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/users.service';
import { formatDate } from '@angular/common';
import * as FileSaver from 'file-saver';
import { saveAs } from 'file-saver';
//import jsPDF from 'jspdf';
declare const require: any;
const jsPDF = require('jspdf');
require('jspdf-autotable');

@Component({
    selector: 'app-utilisateurs',
    templateUrl: './utilisateurs.component.html',
    styleUrls: ['./utilisateurs.component.scss'],
    providers: [ConfirmationService, MessageService],
})
export class UtilisateursComponent implements OnInit {
    users: User[] = [];
    loading: boolean = true;
    userDialog: boolean = false;
    user: User = new User();
    selectedUsers: User[] = [];
    isAdmin: boolean = false;
    exportColumns: any[] | undefined;
    cols: any[] | undefined;
    countusers: number = 0;

    @ViewChild('dt') dt: Table | undefined;
    CongeService: any;

    constructor(
        private userService: UserService,
        private authService: AuthService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
     //   this.loadData();
        this.isAdmin = this.authService.isAdmin();
        this.getAll();
      
        this.cols = [
            {
                field: 'username',
                header: 'User Name',
                customExportHeader: 'username',
            },
            { field: 'email', header: 'Email' },
            { field: 'firstName', header: 'First Name' },
            { field: 'lastName', header: 'Last Name' },
            { field: 'phoneNumber', header: 'Phone Number' },
        ];

        this.exportColumns = this.cols.map((col) => ({
            title: col.header,
            dataKey: col.field,
        }));
    }

    getAll() {
        this.userService.getAllusers().subscribe(
            (r) => {
                this.users = r;
                console.table(this.users);
                this.loading = false;
            },
            (e) => {
                console.error(e);
            }
        );
    }

    openNew() {
        this.user = new User();
        this.loading = false;
        this.userDialog = true;
    }

    loadData() {
        this.userService.getAllusers().subscribe({
            next: (res) => {
                this.users = res.data;
            },
            error: (err) => {
                console.error(err);
            },
        });
    }

    ExportPDF() {
        this.userService.getUserCount().subscribe((r: number) => {
        this.countusers = r;
        let doc = new jsPDF.default('l', 'pt');
        var img = new Image();
        img.src = 'assets/images/HR1.png';
        doc.addImage(img, 'png', 100, 20, 100, 100);
        doc.setTextColor(0, 0, 139);
        var date = formatDate(new Date(), 'yyyy/MM/dd hh:mm a', 'en');
        doc.text(600, 70, 'HR.TN');
        doc.text(600, 90, ' ' + date);
        doc.text(600, 110, 'Total des Utilisateurs est ' + this.countusers);
        doc.text(110, 110, 'HR.TN');
        doc.setTextColor(255, 0, 0);
        doc.setFontSize(20);
        doc.setFont('bold');
        doc.text(320, 130, 'Liste des Utilisateurs\n');
        doc.autoTable(this.exportColumns, this.users, {
            theme: 'grid',
            styles: {
                halign: 'left',
            },
            margin: {
                top: 180,
            },
        });
        doc.setTextColor(0, 0, 0);
        doc.save('Utilisateurs_' + new Date().getTime() + '.pdf');
    });
    }



    exportexcell(exportColumns: any) {
        const replacer = (key: any, value: null) =>
            value === null ? '' : value;
        const header = Object.keys(exportColumns[0]);
        let csv = exportColumns.map((row: { [x: string]: any }) =>
            header
                .map((fieldName) => JSON.stringify(row[fieldName], replacer))
                .join(',')
        );
        csv.unshift(header.join(','));
        let csvArray = csv.join('\r\n');
        var blob = new Blob([csvArray], { type: 'text/csv' });
        saveAs(blob, 'Utilisateurs_' + new Date().getTime() + '.csv');
    }

    savecsv(buffer: any, fileName: string): void {
        let EXCEL_TYPE =
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE,
        });
        FileSaver.saveAs(
            data,
            fileName + '_' + new Date().getTime() + EXCEL_EXTENSION
        );
    }

    deleteSelectedUsers() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected users?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                for (let i = 0; i < this.selectedUsers.length; i++) {
                    const user = this.selectedUsers[i];
                    this.userService.removeUser(user.id!).subscribe({
                        next: (res) => {
                            this.users = this.users.filter(
                                (val) => val.id !== user.id
                            );
                        },
                    });
                }
                this.users = this.users.filter(
                    (val) => !this.selectedUsers.includes(val)
                );
                this.selectedUsers = [];
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Users Deleted',
                    life: 3000,
                });
            },
        });
    }

    editUser(user: User) {
        this.user = { ...user };
        this.userDialog = true;
    }

    deleteUser(user: User) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + user.username + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.userService.removeUser(user.id!).subscribe({
                    next: (res) => {
                        this.users = this.users.filter(
                            (val) => val.id !== user.id
                        );
                        console.log(res);
                    },
                });
            },
        });
    }

    hideDialog() {
        this.userDialog = false;
        this.loading = false;
    }

    saveUser() {
        this.loading = true;
        if (this.user.id) {
            this.userService.updateUser(this.user).subscribe((r) => {
                console.log(r);
            });
            this.users[this.findIndexById(this.user.id)] = this.user;
            this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'User Updated',
                life: 3000,
            });
        } else {
            this.userService.addUser(this.user).subscribe((r) => {
                this.users.push(r);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'User Created',
                    life: 3000,
                });
                ('');
            });
        }

        this.users = [...this.users];
        this.userDialog = false;
        this.user = new User();
    }

    applyFilterGlobal($event: any, stringVal: any) {
        this.dt!.filterGlobal(
            ($event.target as HTMLInputElement).value,
            stringVal
        );
    }

    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    }
}
