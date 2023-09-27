import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Events } from 'src/app/interfaces/events.interface';
import { AuthService } from 'src/app/services/auth.service';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'auth-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  
  eventForm: FormGroup
  eventList: Events[]

  constructor(
    private authService: AuthService, 
    private eventsService: EventsService,
    private router: Router) 
    { this.eventForm = new FormGroup({
      name: new FormControl(),
    })
  }
 
  logout() {
    if (!confirm('Seguro que quieres cerrar sesion?')) return;
    this.authService.logout()
      .then(() => this.router.navigate(['/login']))
      .catch((error) => console.log(error));
  }

  
  async onSubmit() {
    console.log(this.eventForm.value, 'valor del formulario');
    const response = await this.eventsService.addEvent(this.eventForm.value);
    console.log(response, ' valor enviado a la database');
  }

  ngOnInit(): void {
    console.log('PRUEBA');
    this.eventsService.getEvents().subscribe( eventList => {
      console.log(eventList, 'eventos en el ngOnInit');
    })
  }
}
