import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Events } from 'src/app/interfaces/events.interface';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'header-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {

  searchQuery: string = '';
  PUBLISHED_EVENTS: Events[] = [];
  searchResults: any;
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
          console.log(data, 'searchbar');
          this.PUBLISHED_EVENTS = data;
        },
        error: (error) => { console.log(error) }
      })
  }

  ngOnInit(): void {
    this.getEvents()
  }

  onSearch(): void {
    this.searchQuery = this.searchForm.value.searchValue.toLowerCase(); // Ensure it's in lowercase
  
    if (this.searchQuery) {
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
  }
  

}
