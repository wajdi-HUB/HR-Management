import { NgModule } from '@angular/core';

import {
    CommonModule,
    HashLocationStrategy,
    LocationStrategy,
} from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { LoginModule } from './components/login/login.module';
import { RegisterModule } from './components/register/register.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { JwtInterceptor } from './_helpers/interceptor';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ProfileComponent } from './components/profile/profile.component';
import { ButtonModule } from 'primeng/button';
import { InplaceModule } from 'primeng/inplace';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DialogModule } from 'primeng/dialog';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';

@NgModule({
    declarations: [
        AppComponent,
        NotfoundComponent,
        DashboardComponent,
        ProfileComponent,
        ResetpasswordComponent,
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        CommonModule,
        FormsModule,
        ChartModule,
        MenuModule,
        TableModule,
        StyleClassModule,
        PanelMenuModule,
        LoginModule,
        ReactiveFormsModule,
        RegisterModule,
        HttpClientModule,
        BrowserModule,
        ChartModule,
        FullCalendarModule,
        ButtonModule,
        InplaceModule,
        InputTextModule,
        PasswordModule,
        DialogModule,
        SelectButtonModule,
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
