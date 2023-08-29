import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/_services/users.service';

@Component({
    selector: 'app-resetpassword',
    templateUrl: './resetpassword.component.html',
    styleUrls: ['./resetpassword.component.scss'],
})
export class ResetpasswordComponent implements OnInit {
    msg!: 'error';
    loginForm!: FormGroup;
    formSubmitted: boolean = false;
    constructor(private router: Router, private userService: UserService) {}
    ngOnInit(): void {
        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.required]),
        });
    }
    login() {
        this.formSubmitted = true;
        if (this.loginForm.invalid) {
            return alert('please introduce your data');
        }
        console.log(this.loginForm.value.email);

        this.userService.resetPassword(this.loginForm.value.email).subscribe(
            (response: any) => {
                console.log(response);
                // redirect to dashboard
                this.router.navigateByUrl('/login');
            },
            (error: any) => {
                console.log(error);
                if (error.status === 404) {
                    alert('cannot get!!');
                }
            }
        );
    }
    get username() {
        return this.loginForm.get('email');
    }
}
