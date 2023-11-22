import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Events } from 'src/app/interfaces/events.interface';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-fair-page',
  templateUrl: './fair-page.component.html',
  styleUrls: ['./fair-page.component.css']
})
export class FairPageComponent implements OnInit {
  event: Events;
  id: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _eventService: EventsService
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  getEvent() {
    this._eventService.getEvent(this.id).subscribe((data) => {
      this.event = data;
    });
  }
  
  ngOnInit() {
    this.getEvent();
  }
}
