import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizerComponent } from './pages/organizers/organizer/organizer.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FairsComponent } from './pages/fairs/fairs.component';
import { ErrorPageComponent } from './pages/errorPage/errorPage.component';
import { AuthGuard, canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './auth/dashboard/dashboard.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['dashboard']);



const routes: Routes = [
  { 
    path: 'organizadores',
    component: OrganizerComponent
  },
  { 
    path: 'home',
    component: HomeComponent
  },
  { 
    path: 'contacto',
    component: ContactComponent
  },
  { 
    path: 'mercados',
    component: FairsComponent,
  },
  { 
    path: 'error',
    component: ErrorPageComponent,
  },
  { 
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectLoggedInToHome },
  },
  { 
    path: 'dashboard',
    component: DashboardComponent,
    ...canActivate(()=> redirectUnauthorizedTo(['/login']))
  },
  { path: '', pathMatch: 'full', redirectTo: 'home'}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
