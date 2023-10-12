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

  searchQuery: string = '';
  searchResults: any;
  searchForm = this.fb.nonNullable.group({
    searchValue: '',
  })


  getEventos() {
    this._eventService.getEventos()
      .subscribe({
        next: (data) => {
          console.log(data, 'searchbar');
          this.PUBLISHED_EVENTS = data;
        },
        error: (error) => { console.log(error) }
      })
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

