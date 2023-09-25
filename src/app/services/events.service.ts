
import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventsService {

  constructor (private firestore: Firestore) {}


  addPlace(place: any){
    const placeref = collection(this.firestore, 'mercados')
    return addDoc(placeref, place)
  }

  getPlaces(): Observable<any[]>{
    const placeref = collection(this.firestore, 'mercados')
    return collectionData(placeref, { idField: 'id'}) as Observable <any[]>
  }

}