import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { finalize } from 'rxjs';
import { Events } from 'src/app/interfaces/events.interface';
import { EventsService } from 'src/app/services/events.service';

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

  constructor(private _eventService: EventsService, private fb: FormBuilder) { }

  toggleDescription(event: any) {
    event.showFullDescription = !event.showFullDescription;
  }

  getEvents() {
    this._eventService.getEventos()
      .pipe(
        finalize(() => console.log())
      )
      .subscribe({
        next: (data) => {
          this.PUBLISHED_EVENTS = data;
        },
        error: (error) => { console.log(error) }
      })

  }

  ngOnInit(): void {
    this.getEvents()
  }
}

