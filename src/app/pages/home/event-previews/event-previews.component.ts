import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { Events } from 'src/app/interfaces/events.interface';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'home-event-previews',
  templateUrl: './event-previews.component.html',
  styleUrls: ['./event-previews.component.scss']
})
export class EventPreviewsComponent implements OnInit {

  PUBLISHED_EVENTS: Events[] = [];

  constructor(
    private _eventService: EventsService
  ) { }


  getEvents() {
    this._eventService.getEventos()
      .subscribe({
        next: (data) => {
          const currentDate = new Date();
          data = data.filter(event => new Date(event.dataEnd) >= currentDate)
          this.PUBLISHED_EVENTS = data;
        },
        error: (error) => { console.log(error) }
      })
  }

  ngOnInit(): void {
    this.getEvents()
  }

}
