///<reference path="../../../../../node_modules/@types/googlemaps/index.d.ts"/>

import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Events } from 'src/app/interfaces/events.interface';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'pages-contact-new-event-form',
  templateUrl: './new-event-form.component.html',
  styleUrls: ['./new-event-form.component.scss']
})
export class NewEventFormComponent implements OnInit {

  @ViewChild('divMap') divMap!: ElementRef;
  @ViewChild('inputPlaces') inputPlaces!: ElementRef;

  mapa!: google.maps.Map;
  markers: google.maps.Marker[];
  distancia!: string;

  eventForm: FormGroup;
  title: string = "Formulario del evento"
  id: string;

  // CONSTRUIMOS EL FORMULARIO 
  constructor(
    private formBuilder: FormBuilder,
    private eventsService: EventsService,
    private toastr: ToastrService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private renderer: Renderer2,
  ) {
    this.markers = [];
    this.eventForm = this.formBuilder.group({
      name: ['', Validators.required,],
      email: ['', [Validators.required, Validators.email]],
      dataStart: ['', Validators.required],
      dataEnd: ['', Validators.required],
      description: ['', Validators.required],
      organizer: [''],
      telephone: [''],
      image: [''],
      busqueda: new FormControl(''),
      direccion: new FormControl(''),
      referencia: new FormControl(''),
      ciudad: new FormControl(''),
      provincia: new FormControl(''),
      region: new FormControl('')
    })
    this.id = this.activatedRouter.snapshot.paramMap.get('id');
  }

  // SE CARGA AL ABRIR LA PAGINA
  ngOnInit(): void {
    this.getEvent()
  }


  //ENVIAMOS EL FORMULARIO Y LO VALIDAMOS
  onSubmit() {
    if (this.eventForm.valid) {
      const EVENT: Events = {
        name: this.eventForm.get('name').value,
        email: this.eventForm.get('email').value,
        dataStart: this.eventForm.get('dataStart').value,
        dataEnd: this.eventForm.get('dataEnd').value,
        description: this.eventForm.get('description').value,
        organizer: this.eventForm.get('organizer')?.value,
        telephone: this.eventForm.get('telephone')?.value,
        image: this.eventForm.get('image')?.value,
      }
      if (this.id !== null) {
        this.eventsService.modifyEvent(this.id, EVENT).subscribe(data => {
          this.toastr.info('El evento ha sido actualizado con exito', 'Evento modificado');
          this.router.navigate(['/dashboard'])
        }, error => {
          this.eventForm.reset()
        })
      } else {
        this.eventsService.createEvent(EVENT).subscribe(data => {
          this.toastr.success('Hemos recibido su solicitud y esta en proceso de revisión.', 'Formulario enviado con éxito!');
          this.eventForm.reset()
        }, error => console.log(error, 'Form fail'))
      }
    } else { this.eventForm.markAllAsTouched(), console.log('form error'); }
  }


  // MODIFICAR EL EVENTO
  getEvent() {
    if (this.id !== null) {
      this.title = "Editar evento";
      this.eventsService.getEvent(this.id).subscribe(data => {
        this.eventForm.setValue({
          name: data.name,
          email: data.email,
          dataStart: data.dataStart,
          dataEnd: data.dataEnd,
          description: data.description,
          organizer: data.organizer,
          telephone: data.telephone,
          image: data.image,
        })
      })
    }
  }


  // GOOGLE MAPS
  ngAfterViewInit(): void {
    const opciones = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        await this.loadMap(position);
        this.placeAutocomplete();
      }, null, opciones);
    } else {
      console.log("navegador no compatible")
    }
  };

  private placeAutocomplete() {

    const autocomplete = new google.maps.places.Autocomplete(this.renderer.selectRootElement(this.inputPlaces.nativeElement), {
      componentRestrictions: {
        country: ["ES"]
      },
      fields: ["address_components", "geometry"],
      types: ["address"],
    })
    google.maps.event.addListener(autocomplete, 'place_changed', () => {

      const place: any = autocomplete.getPlace();
      console.log("el place completo es:", place)

      this.mapa.setCenter(place.geometry.location);
      const marker = new google.maps.Marker({
        position: place.geometry.location
      });

      marker.setMap(this.mapa);
      this.fillMapForm(place);
    })
  }

  fillMapForm(place: any) {
    const addressNameFormat: any = {
      'street_number': 'short_name',
      'route': 'long_name',
      'administrative_area_level_1': 'short_name',
      'administrative_area_level_2': 'short_name',
      'administrative_area_level_3': 'short_name',
      'country': 'long_name',

    };
    const getAddressComp = (type: any) => {
      for (const component of place.address_components) {
        if (component.types[0] === type) {
          return component[addressNameFormat[type]];
        }
      }
      return ' '
    };
    const componentForm = {
      direccion: 'location',
      ciudad: "administrative_area_level_3",
      provincia: 'administrative_area_level_2',
      region: 'administrative_area_level_1'
    };
    Object.entries(componentForm).forEach(entry => {
      const [key, value] = entry;

      this.eventForm.controls[key].setValue(getAddressComp(value))
    });

    this.eventForm.controls['direccion'].setValue(getAddressComp('route') + ' ' + getAddressComp('street_number'))
  };

  loadMap(position: any): any {

    const opciones = {
      center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.mapa = new google.maps.Map(this.renderer.selectRootElement(this.divMap.nativeElement), opciones)

    const markerPosition = new google.maps.Marker({
      position: this.mapa.getCenter(),
      title: "David",
    });

    markerPosition.setMap(this.mapa);
    this.markers.push(markerPosition);
  };

}
