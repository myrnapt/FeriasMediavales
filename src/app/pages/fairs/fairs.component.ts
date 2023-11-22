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

  PUBLISHED_EVENTS: Events[] = [];
  selectedEvent: Events | null = null;
  searchError: boolean = false;

  constructor(
    private _eventService: EventsService,
    private router: Router) { }

  handlePublishedEvents(events: Events[]) {
    this.PUBLISHED_EVENTS = events;
    if (this.PUBLISHED_EVENTS.length === 0) {
      this.searchError = true;
    } else { this.searchError = false }
  }

  getEvents() {
    this._eventService.getEventos()
      .subscribe({
        next: (data) => {
          this.PUBLISHED_EVENTS = data.filter(event => event.isPublished === true);
        },
        error: (error) => {
          console.error('Error fetching events:', error);
        }
      });
  }


  ngOnInit(): void {
    this.getEvents();
  }

  redirigirAFormulario(eventID: any) {
    this.selectedEvent = this.PUBLISHED_EVENTS.find(event => event._id === eventID);
    this.router.navigate(['mercado/' + eventID]);
  }
}

