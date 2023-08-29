import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [``],
})
export class LoginComponent implements OnInit {
    msg!: 'error';
    loginForm!: FormGroup;
    formSubmitted: boolean = false;
    constructor(private router: Router, private s: AuthService) {}
    ngOnInit(): void {
        this.loginForm = new FormGroup({
            username: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
        });
    }
    login() {
        this.formSubmitted = true;
        if (this.loginForm.invalid) {
            return alert('please introduce your data');
        }
        this.s.signin(this.loginForm.value).subscribe(
            (response: any) => {
                // set the token in the localStorage
                localStorage.setItem('token', response.accessToken);
                localStorage.setItem('role', response.roles);
                this.s.updateLoggedInState(true);
                // redirect to dashboard
                this.router.navigateByUrl('/dashboard');
            },
            (error: any) => {
                console.log(error);
                this.s.updateLoggedInState(false);
                if (error.status === 404) {
                    // this.toasterService.pop('error', 'Veuillez vérifier votre e-mail ou votre mot de passe!', error.error.message);
                    alert('cannot get!!');
                }
            }
        );
    }
    get username() {
        return this.loginForm.get('email');
    }

    get password() {
        return this.loginForm.get('password');
    }
}
