import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from './layout/app.layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { UtilisateursComponent } from './components/contenu/utilisateurs/utilisateurs.component';
import { CongeComponent } from './components/contenu/conge/conge.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: '',
                    component: AppLayoutComponent,

                    children: [
                        {
                            path: 'dashboard',
                            component: DashboardComponent,
                            canActivate: [AuthGuard],
                            data: { role: 'ROLE_ADMIN' }

                        },
                        {
                            path: 'profile',
                            component: ProfileComponent,
                            canActivate: [AuthGuard],
                        },
                        { path: '', pathMatch: 'full', redirectTo: 'login' },
                        { path: 'register', component: RegisterComponent },
                        { path: 'login', component: LoginComponent },
                        { path: 'reset', component: ResetpasswordComponent },
                        {
                            path: 'contenu',

                            loadChildren: () =>
                                import(
                                    './components/contenu/contenu.module'
                                ).then((m) => m.ContenuModule),
                        },
                    ],
                },

                {
                    path: '**',
                    component: NotfoundComponent,
                },
            ],
            { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' }
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
