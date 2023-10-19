import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { Events } from 'src/app/interfaces/events.interface';
import { EventsService } from 'src/app/services/events.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pages-fairs',
  templateUrl: './fairs.component.html',
  styleUrls: ['./fairs.component.scss']
})
export class FairsComponent implements OnInit {

  handlePublishedEvents(events: Events[]) {
    this.PUBLISHED_EVENTS = events;

  }
  PUBLISHED_EVENTS: Events[] = [];
  selectedEvent: Events | null = null;

  constructor(
    private _eventService: EventsService, 
    private router: Router) { }

    getEvents() {
      this._eventService.getEventos()
        .pipe(
          finalize(() => console.log())
        )
        .subscribe({
          next: (data) => {
            this.PUBLISHED_EVENTS = data.filter(event => event.isPublished === true);
          },
          error: (error) => { console.log(error) }
        });
    }

  ngOnInit(): void {
    this.getEvents()
  }

  redirigirAFormulario(eventID: any) {
    this.selectedEvent = this.PUBLISHED_EVENTS.find(event => event._id === eventID);
    this.router.navigate(['mercado/' + eventID]);
  }
}

