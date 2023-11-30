import { DatePipe } from '@angular/common';
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
export class DashboardComponent implements OnInit {

  // VARIABLES
  readonly APIUrl = "https://magnificent-long-underwear-frog.cyclic.app/eventos/"
  LIST_EVENTS: Events[] = [];
  selectedEvent: Events | null = null;
  sortCriteria: string | null = null;
  sortOrder: 'asc' | 'desc' = 'asc';


  constructor(
    private _eventService: EventsService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private datePipe: DatePipe,
  ) { }


  // CARGAR TODOS LOS EVENTOS
  getEvents() {
    this._eventService.getEventos()
      .subscribe({
        next: (data) => {
          const currentDate = new Date();

          // FILTRAR EVENTOS FINALIZADOS
          data = data
            .filter(event => new Date(event.dataEnd) >= currentDate);

          // ORDENAR
          data = data.sort((a, b) => {
            if (this.sortCriteria === 'name') {
              return this.sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
            } else if (this.sortCriteria === 'date') {
              return this.sortOrder === 'asc' ? new Date(a.dataStart).getTime() - new Date(b.dataStart).getTime() :
                new Date(b.dataStart).getTime() - new Date(a.dataStart).getTime();
            } else {
              // Default sorting by creation date if no criteria is selected
              return new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime();
            }
          });

          const unpublishedEvents = data.filter(event => !event.isPublished);
          const publishedEvents = data.filter(event => event.isPublished);
          this.LIST_EVENTS = [...unpublishedEvents, ...publishedEvents];
        },
        error: (error) => { console.log(error) }
      });
  }

  // ORDENAR EVENTO
  sortEvents(criteria: string) {
    if (this.sortCriteria === criteria) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortCriteria = criteria;
    }
    this.getEvents();
  }

  // BORRAR EVENTO
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

  // EDITAR EVENTO
  redirigirAFormulario(eventID: any) {
    this.selectedEvent = this.LIST_EVENTS.find(event => event._id === eventID);
    this.router.navigate(['editar-formulario/' + eventID]);
  }

  // CARGAR EVENTOS AL INICIAR
  ngOnInit() {
    this.getEvents();
  }

  modifyEvent(id: string) {
  }

  // PUBLICAR EVENTO
  publishEvent(eventID: string) {
    const selectedEvent = this.LIST_EVENTS.find((event) => event._id === eventID);
    const confirmed = confirm('¿Seguro que quieres publicar este evento?');

    if (confirmed) {
      this._eventService.publishEvent(eventID, true).subscribe({
        next: (data) => {
          this.toastr.success('El evento ha sido publicado con éxito', 'Evento publicado');
          selectedEvent.isPublished = true;
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => { }
      });
    } else {
      console.log('La publicación del evento ha sido cancelada');
    }
  }

  // CERRAR SESIÓN
  logout() {
    if (!confirm('Seguro que quieres cerrar sesión?')) return;
    this.authService.logout()
      .then(() => this.router.navigate(['/login']))
      .catch((error) => console.log(error));
  }

  // REDIRIGIR A FORMULARIO PARA CREAR EVENTO
  redirigirARuta() {
    this.router.navigate(['/formulario']);
  }

}
