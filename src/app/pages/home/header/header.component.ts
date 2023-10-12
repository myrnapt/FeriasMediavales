import { Component } from '@angular/core';

@Component({
  selector: 'home-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  LIST_EVENTS: Event[] = []; // This is your event list

  constructor() {}

  ngOnInit() {
    // Initialize your event list here or retrieve it from a service
  }

  onSearchResults(searchResults: Event[]) {
    // This method is called when the search results are emitted from the child component
    // Update your event list with the search results
    this.LIST_EVENTS = searchResults;
  }
}
