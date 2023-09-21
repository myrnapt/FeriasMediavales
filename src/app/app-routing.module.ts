import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizerComponent } from './pages/organizers/organizer/organizer.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FairsComponent } from './pages/fairs/fairs.component';
import { ErrorPageComponent } from './pages/errorPage/errorPage.component';
import { AdminComponent } from './auth/admin/admin.component';
import { PanelComponent } from './auth/panel/panel.component';
import { AuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

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
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectLoggedInToHome },
  },
  { 
    path: 'dashboard',
    component: PanelComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
