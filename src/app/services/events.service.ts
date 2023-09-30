
import { Injectable } from '@angular/core';
import { Events } from '../interfaces/events.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventsService {

  private apiUrl = 'http://localhost:5038/api/mercados-mediavales'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) {}

  addEvent(event: Events): Observable<any> {
    const endpoint = `${this.apiUrl}/add-mercados`;
    return this.http.post(endpoint, event);
  }

  getEvents(): Observable<Events[]> {
    const endpoint = `${this.apiUrl}/get-mercados`;
    return this.http.get<Events[]>(endpoint);
  }


}