import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styles: [
        `
            :host ::ng-deep .p-password input {
                width: 100%;
                padding: 1rem;
            }
            :host ::ng-deep .pi-eye {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }
            :host ::ng-deep .pi-eye-slash {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }
        `,
    ],
})
export class RegisterComponent implements OnInit {
    signupForm!: FormGroup;
    formSubmitted: boolean = false;
    constructor(private router: Router, private s: AuthService) {}

    ngOnInit(): void {
        this.signupForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required]),
            username: new FormControl('', [Validators.required]),
            firstName: new FormControl('', [Validators.required]),
            lastName: new FormControl('', [Validators.required]),
            phone: new FormControl('', [Validators.required]),
        });
    }

    register() {
        this.formSubmitted = true;
        if (this.signupForm.invalid) {
            return alert('please fill the blank or check your error');
        }
        this.s.register(this.signupForm.value).subscribe(
            (response: any) => {
                alert('register success');
                // redirect to dashboard
                this.router.navigateByUrl('/login');
            },
            (error: any) => {
                console.log(error);

                if (error.status === 404) {
                    alert('error');
                }
            }
        );
    }
    get email() {
        return this.signupForm.get('username');
    }

    get password() {
        return this.signupForm.get('password');
    }
    get username() {
        return this.signupForm.get('username');
    }
    get phone() {
        return this.signupForm.get('phone');
    }
}
