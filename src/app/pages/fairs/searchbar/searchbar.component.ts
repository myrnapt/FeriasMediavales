import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Events } from 'src/app/interfaces/events.interface';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'header-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {
  
  @Output() publishEvents: EventEmitter<Events[]> = new EventEmitter<Events[]>();

 
  searchQuery: string = '';
  PUBLISHED_EVENTS: Events[] = [];
  searchForm = this.fb.nonNullable.group({
    searchValue: '',
  })

  constructor(
    private _eventService: EventsService,
    private fb: FormBuilder) { }

  getEvents() {
    this._eventService.getEventos()
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

  onSearch(): void {
    this.searchQuery = this.searchForm.value.searchValue.toLowerCase();
    if (this.searchQuery.length >= 3) {
      this.PUBLISHED_EVENTS = this.PUBLISHED_EVENTS.filter(event => {
        return (
          event.region.toLowerCase().includes(this.searchQuery) ||
          event.provincia.toLowerCase().includes(this.searchQuery) ||
          event.name.toLowerCase().includes(this.searchQuery)
        );
      });
    } else {
      this.getEvents();
    }
    this.getEvents();
      this.sendEventsToParent();
  }

  sendEventsToParent() {
    this.publishEvents.emit(this.PUBLISHED_EVENTS);
  }
}
