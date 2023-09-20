import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizerComponent } from './pages/organizers/organizer/organizer.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FairsComponent } from './pages/fairs/fairs.component';
import { ErrorPageComponent } from './pages/errorPage/errorPage.component';
import { AdminComponent } from './pages/admin/admin.component';

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
    path: 'admin',
    component: AdminComponent,
  },
  { 
    path: '**',
    redirectTo: 'error'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
