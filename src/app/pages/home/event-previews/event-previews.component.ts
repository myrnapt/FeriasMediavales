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

constructor( private _eventService: EventsService) {}


getEvents() {
  this._eventService.getEventos()
  .pipe(
    finalize(()=> console.log())
  )
  .subscribe({
    next: (data) => { 
      this.PUBLISHED_EVENTS = data;
    },
    error: (error) => { console.log(error)}
  })
  
  }
  
  ngOnInit(): void {
    this.getEvents()
  }


  
}
