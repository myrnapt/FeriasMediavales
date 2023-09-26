
import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, getDocs } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Events } from '../interfaces/events.interface';

@Injectable({
  providedIn: 'root',
})
export class EventsService {


  constructor (private firestore: Firestore) {}


  addPlace(place: Events){
    const placeref = collection(this.firestore, 'mercados')
    return addDoc(placeref, place)
  }

  getPlaces(): Observable<Events[]>{
    const placeref = collection(this.firestore, 'mercados')
    console.log(placeref);
    return collectionData(placeref, { idField: 'id'}) as Observable <Events[]>
  }



}