
import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class EventsService {

    constructor (private firestore: Firestore) {}


    addPlace(place: any){
        const placeref = collection(this.firestore, 'mercados')
        return addDoc(placeref, place)
    }


}