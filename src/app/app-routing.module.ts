import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizerComponent } from './pages/organizers/organizer/organizer.component';
import { HomeComponent } from './pages/home/home/home.component';

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
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
