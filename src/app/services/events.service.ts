
import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Events } from '../interfaces/events.interface';

@Injectable({
  providedIn: 'root',
})
export class EventsService {

  constructor (private firestore: Firestore) {}

  addEvent(event: Events){
    const eventRef = collection(this.firestore, 'mercados');
    return addDoc(eventRef, event);
  }

  getEvents(): Observable<Events[]>{
    const eventRef = collection(this.firestore, 'mercados');
    console.log(eventRef, 'referencia para la lista de eventos');
    return collectionData(eventRef, { idField: 'id'}) as Observable <Events[]>;
  }

}