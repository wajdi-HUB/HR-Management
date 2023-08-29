import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from './service/app.layout.service';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { ProfileService } from '../_services/profile.service';
import { User } from '../_models/user';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent {
    items!: MenuItem[];

    constructor(
        public layoutService: LayoutService,
        private authService: AuthService,
        private profileservice: ProfileService
    ) {}

    logout() {
        this.authService.logout();
    }
    
    profile() {
        this.profileservice.profile();
    }
}
