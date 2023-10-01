
import { Injectable } from '@angular/core';
import { Events } from '../interfaces/events.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventsService {

  private apiUrl = 'http://localhost:5038/api/mercados-mediavales/'; // Reemplaza con la URL de tu API

  constructor(
    private http: HttpClient) {}

  getEventos(): Observable<any> {
    return this.http.get(this.apiUrl)
  }

  deleteEvent(id: any): Observable<any> {
    return this.http.delete(this.apiUrl + id )
  }

  createEvent(event: Events): Observable<any> {
    return this.http.post(this.apiUrl, event)
  }


}