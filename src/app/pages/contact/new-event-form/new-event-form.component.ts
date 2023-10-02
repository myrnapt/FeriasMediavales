import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Events } from 'src/app/interfaces/events.interface';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'pages-contact-new-event-form',
  templateUrl: './new-event-form.component.html',
  styleUrls: ['./new-event-form.component.scss']
})
export class NewEventFormComponent implements OnInit{

  eventForm: FormGroup;
  title: string = "Formulario del evento"
  id: string;

  // CONSTRUIMOS EL FORMULARIO 
  constructor(
     private formBuilder: FormBuilder,
     private eventsService: EventsService,
     private toastr: ToastrService,
     private activatedRouter: ActivatedRoute ,
     private router: Router,
  ) {
    this.eventForm = this.formBuilder.group({
      name: ['', Validators.required,],
      email: ['', [Validators.required, Validators.email]],
      dataStart: ['', Validators.required],
      dataEnd: ['', Validators.required],
      lat: ['', Validators.required],
      lng: ['', Validators.required],
      description: ['', Validators.required],
      organizer: [''], 
      telephone: [''], 
      price: [''], 
      image: [''], 
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
      lat: this.eventForm.get('lat').value,
      lng: this.eventForm.get('lng').value,
      description: this.eventForm.get('description').value,
      organizer: this.eventForm.get('organizer')?.value,
      telephone: this.eventForm.get('telephone')?.value,
      price: this.eventForm.get('price')?.value,
      image: this.eventForm.get('image')?.value,
    }
      if (this.id !== null) {
        this.eventsService.modifyEvent(this.id, EVENT).subscribe(data => {
          this.toastr.info('El evento ha sido actualizado con exito','Evento modificado');
          this.router.navigate(['/dashboard'])
        }, error => {
          this.eventForm.reset()
        })
      } else {
        this.eventsService.createEvent(EVENT).subscribe( data => {
          this.toastr.success('Hemos recibido su solicitud y esta en proceso de revisión.','Formulario enviado con éxito!');
          this.eventForm.reset()
        }, error => console.log(error, 'Form fail'))
      }
    } else { this.eventForm.markAllAsTouched(), console.log('form error'); }
  }

  getEvent() {
    if (this.id !== null) {
      this.title = "Editar evento";
      this.eventsService.getEvent(this.id).subscribe(data => {
        this.eventForm.setValue({
          name: data.name,
          email: data.email,
          dataStart: data.dataStart,
          dataEnd: data.dataEnd,
          lat: data.lat,
          lng: data.lng,
          description: data.description,
          organizer: data.organizer,
          telephone: data.telephone,
          price: data.price,
          image: data.image,
        })
      })
    }
  }

}
