
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Events } from 'src/app/interfaces/events.interface';
import { EventsService } from 'src/app/services/events.service';
import { LocationFormComponent } from './location-form/location-form.component';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'pages-contact-new-event-form',
  templateUrl: './new-event-form.component.html',
  styleUrls: ['./new-event-form.component.scss']
})
export class NewEventFormComponent implements OnInit {

  @ViewChild(LocationFormComponent) locationFormComponent: LocationFormComponent; // Add this line

  selectedEvent: Events | null = null;
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
    private datePipe: DatePipe,
  ) {
    this.eventForm = this.formBuilder.group({
      name: ['', Validators.required,],
      email: ['', [Validators.required, Validators.email]],
      dataStart: ['', Validators.required],
      dataEnd: ['', Validators.required],
      description: ['', Validators.required],
      telephone: [''],
      image: [''],
      direccion: [''],
      provincia: [''],
      region: [''],
    })
    this.id = this.activatedRouter.snapshot.paramMap.get('id');
  }

  // SE CARGA AL ABRIR LA PAGINA
  ngOnInit(): void {
    this.modifyEvent()
  }

  mergeFormValues() {
    const childFormValues = this.locationFormComponent.formMapas.value;
    const mergedData = {
      ...this.eventForm.value,
      ...childFormValues
    };

    console.log("Merged Form Data: ", mergedData);
  }


  //ENVIAMOS EL FORMULARIO Y LO VALIDAMOS
  onSubmit() {
    this.mergeFormValues();

    if (this.eventForm.valid) {
      const EVENT: Events = {
        name: this.eventForm.get('name').value,
        email: this.eventForm.get('email').value,
        dataStart: this.eventForm.get('dataStart').value,
        dataEnd: this.eventForm.get('dataEnd').value,
        description: this.eventForm.get('description').value,
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
  modifyEvent() {
    if (this.id !== null) {
      this.title = "Editar evento";
      this.eventsService.getEvent(this.id).subscribe(data => {
        console.log(data, '1');
        const formattedStartDate = this.datePipe.transform(data.dataStart, 'yyyy-MM-dd');
        const formattedEndDate = this.datePipe.transform(data.dataEnd, 'yyyy-MM-dd');
        this.eventForm.patchValue({
          name: data.name,
          email: data.email,
          dataStart: data.formattedStartDate,
          dataEnd: data.formattedEndDate,
          description: data.description,
          telephone: data.telephone,
          image: data.image,
        })
      })
    }
  }

}