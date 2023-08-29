import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContenuRoutingModule } from './contenu-routing.module';
import { ContenuComponent } from './contenu.component';
import { UtilisateursComponent } from './utilisateurs/utilisateurs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { ChartModule } from 'primeng/chart';
import { PresenceComponent } from './presence/presence.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { TeamComponent } from './team/team.component';
import { CongeComponent } from './conge/conge.component';
import { HolidayComponent } from './holiday/holiday.component';
import { FormationComponent } from './formation/formation.component';
import { ProjectComponent } from './project/project.component';
import { TaskComponent } from './task/task.component';
import { AbsenceComponent } from './absence/absence.component';
import { ConversionComponent } from './conversion/conversion.component';
import { FileUploadModule } from 'primeng/fileupload';
import { Formation } from 'src/app/_models/formation';
import { JitsiComponent } from './formation/jitsi/jitsi.component';
import { MeetComponent } from './formation/jitsi/meet/meet.component';
import { TaskByProjectComponent } from './task-by-project/task-by-project.component';
import { PostComponent } from './post/post.component';


@NgModule({
    declarations: [
        ContenuComponent,
        UtilisateursComponent,
        PresenceComponent,
        CongeComponent,
        TeamComponent,
        HolidayComponent,
        AbsenceComponent,
        ConversionComponent,
        TaskComponent,
        ProjectComponent,
        FormationComponent,
        JitsiComponent,
        MeetComponent,
        TaskByProjectComponent,
        PostComponent,
   
    ],
    imports: [
        ConfirmPopupModule,
        InputNumberModule,
        CommonModule,
        ContenuRoutingModule,
        CommonModule,
        FormsModule,
        TableModule,
        RatingModule,
        ButtonModule,
        SliderModule,
        InputTextModule,
        ToggleButtonModule,
        RippleModule,
        MultiSelectModule,
        DropdownModule,
        ProgressBarModule,
        ToastModule,
        ToolbarModule,
        DialogModule,
        ReactiveFormsModule,
        ConfirmDialogModule,
        ChartModule,
        FullCalendarModule,
        CalendarModule,
        FileUploadModule,
    ],
})
export class ContenuModule {}
