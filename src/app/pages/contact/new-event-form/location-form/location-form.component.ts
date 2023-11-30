///<reference path="../../../../../../node_modules/@types/googlemaps/index.d.ts"/>

import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'contact-newEvent-locationform',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.scss'],
})
export class LocationFormComponent {
  @ViewChild('divMap') divMap!: ElementRef;
  @ViewChild('inputPlaces') inputPlaces!: ElementRef;

  mapa!: google.maps.Map;
  markers: google.maps.Marker[];
  distancia!: string;
  formMapas!: FormGroup;

  constructor(private renderer: Renderer2) {
    this.markers = [];

    this.formMapas = new FormGroup({
      busqueda: new FormControl(''),
      direccion: new FormControl(''),
      referencia: new FormControl(''),
      ciudad: new FormControl(''),
      provincia: new FormControl(''),
      region: new FormControl(''),
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const opciones = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          await this.cargarMapa(position);
          this.cargarAutocomplete();
        },
        null,
        opciones
      );
    } else {
      console.log('navegador no compatible');
    }
  }

  onSubmit() {
    this.formMapas.reset()
  }


  private cargarAutocomplete() {

    const autocomplete = new google.maps.places.Autocomplete(
      this.renderer.selectRootElement(this.inputPlaces.nativeElement),
      {
        componentRestrictions: {
          country: ['ES'],
        },
        fields: ['address_components', 'geometry', 'place_id'],
        types: ['address'],
      }
    );

    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place: any = autocomplete.getPlace();
      this.mapa.setCenter(place.geometry.location);
      const marker = new google.maps.Marker({
        position: place.geometry.location,
      });

      marker.setMap(this.mapa);
      this.llenarFormulario(place);
    });
  }

  llenarFormulario(place: any) {
    console.log(place);
    const addressNameFormat: any = {
      street_number: 'long_name',
      route: 'long_name',
      administrative_area_level_1: 'long_name',
      administrative_area_level_2: 'long_name',
      administrative_area_level_3: 'long_name',
      country: 'long_name',
    };
    const getAddressComp = (type: any) => {
      for (const component of place.address_components) {
        if (component.types[0] === type) {
          return component[addressNameFormat[type]];
        }
      }
      return ' ';
    };
    const componentForm = {
      direccion: 'location',
      ciudad: 'administrative_area_level_3',
      provincia: 'administrative_area_level_2',
      region: 'administrative_area_level_1',
    };

    
    Object.entries(componentForm).forEach((entry) => {
      const [key, value] = entry;
      
      this.formMapas.controls[key].setValue(getAddressComp(value));
    });
    
    this.formMapas.controls['direccion'].setValue(
      getAddressComp('route') + ' ' + getAddressComp('street_number')
      );
      
    const direccionString =  this.formMapas.controls['direccion'].setValue(
      getAddressComp('route') + ' ' + getAddressComp('street_number')
      );

  }

  resetFormData() {
    this.formMapas.reset()
  }
  
  cargarMapa(position: any): any {
    const opciones = {
      center: new google.maps.LatLng(
        position.coords.latitude,
        position.coords.longitude
      ),
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };

    this.mapa = new google.maps.Map(
      this.renderer.selectRootElement(this.divMap.nativeElement),
      opciones
    );

    const markerPosition = new google.maps.Marker({
      position: this.mapa.getCenter(),
    });

    markerPosition.setMap(this.mapa);
    this.markers.push(markerPosition);
  }
}
