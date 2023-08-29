import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Conversion, TypeOfConversion } from 'src/app/_models/conversion';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/auth.service';
import { CongeService } from 'src/app/_services/conge.service';
import { ConversionService } from 'src/app/_services/conversion.service';
import { UserService } from 'src/app/_services/users.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    providers: [MessageService, ConfirmationService],
})
export class ProfileComponent implements OnInit {
    user: User = new User();
    password: string = "";
    isAdmin: boolean = false;
    soldeConge: number = 0;
    dialog: boolean = false;
    stateOptions: any[] = [];
    value: TypeOfConversion = TypeOfConversion.ARGENT;
    cantRequestConversion: boolean = true;

    constructor(
        private userService: UserService,
        private authService: AuthService,
        private messageService: MessageService,
        private congeService: CongeService,
        private conversionService: ConversionService
    ) {}

    ngOnInit(): void {
        this.stateOptions = [
            { label: 'Convertir en argent', value: TypeOfConversion.ARGENT },
            {
                label: "Convertir en solde pour l'année prochaine",
                value: TypeOfConversion.SOLDE,
            },
        ];
        this.isAdmin = this.authService.isAdmin();
        this.userService.getCurrentUser().subscribe((r) => {
            this.user = r;
            this.conversionService
                .getCurrentUserConversion(this.user.id!)
                .subscribe({
                    next: (r) => {
                        console.log(r);
                        if (r === null) {
                            this.cantRequestConversion = false;
                        }
                    },
                });
            this.congeService.getSoldeConge(this.user.id!).subscribe({
                next: (r) => {
                    console.log(r);
                    this.soldeConge = r;
                },
            });
            this.congeService.getUserSoldeConge(this.user.id!).subscribe({
                next: (r) => {
                    this.soldeConge = r;
                },
            });
        });
    }

    saveUser() {
        if (this.user.id) {
            this.userService.updateUser(this.user).subscribe((r) => {
                console.log(r.password);
            });
            this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Modification enregistrée',
                life: 3000,
            });
        }
    }

    saveUserPassword() {
        if (this.user.id) {
            this.userService
                .updateUserPassword(this.user, this.password)
                .subscribe((r) => {
                    console.log(r.password);
                });
            this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Modification enregistrée',
                life: 3000,
            });
        }
    }

    showDialog() {
        this.dialog = true;
    }

    hideDialog() {
        this.dialog = false;
    }

    sendRequest() {
        console.log(this.value);
        let conversionRequest: Conversion = new Conversion();
        conversionRequest.conversionType = this.value;
        conversionRequest.user = this.user;
        this.conversionService.addConversion(conversionRequest).subscribe({
            next: (r) => {
                console.log(r);
                this.cantRequestConversion = true;
                this.dialog = false;
            },
        });
    }
}
