import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Events } from 'src/app/interfaces/events.interface';
import { AuthService } from 'src/app/services/auth.service';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'auth-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit  {
  
  readonly APIUrl = "http://localhost:5038/api/mercados-mediavales/"
  LIST_EVENTS: Events[] = [];
  selectedEvent: Events | null = null;


  constructor(
    private _eventService: EventsService,
    private authService: AuthService, 
    private router: Router,
    private toastr: ToastrService) 
    {}
 
  getEvents() {
    this._eventService.getEventos().subscribe( data => {
      console.log(data);
      this.LIST_EVENTS = data;
    }, error => {
      console.log(error)
    })
  }

  deleteEvent(id: any) {
    const confirmed = confirm('¿Seguro que quiere eliminar el evento?');
    
    if (confirmed) {
      this._eventService.deleteEvent(id).subscribe({
        next: (data) => {
          this.toastr.error('El evento ha sido eliminado con éxito', 'Evento eliminado');
          this.getEvents();
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
        }
      });
    } else {
      console.log('La eliminación del evento ha sido cancelada');
    }
  }
  
  
  logout() {
    if (!confirm('Seguro que quieres cerrar sesion?')) return;
    this.authService.logout()
      .then(() => this.router.navigate(['/login']))
      .catch((error) => console.log(error));
  }

  redirigirARuta() {
    this.router.navigate(['/formulario']);
  }

  redirigirAFormulario(eventID: any) {
    this.selectedEvent = this.LIST_EVENTS.find(event => event._id === eventID);
    this.router.navigate(['editar-formulario/' + eventID]);
  }

  ngOnInit() {
    this.getEvents()
  }

  modifyEvent(id: string) {
    
  }
}
