import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Events } from 'src/app/interfaces/events.interface';
import { EventsService } from 'src/app/services/events.service';
import { LocationFormComponent } from './location-form/location-form.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'pages-contact-new-event-form',
  templateUrl: './new-event-form.component.html',
  styleUrls: ['./new-event-form.component.scss'],
})
export class NewEventFormComponent implements OnInit {
  @ViewChild(LocationFormComponent)
  locationFormComponent: LocationFormComponent;

  selectedEvent: Events | null = null;
  eventForm: FormGroup;
  title: string = 'Formulario del evento';
  id: string;
  file: string;
  imageData: string;

  // CONSTRUIMOS EL FORMULARIO
  constructor(
    private formBuilder: FormBuilder,
    private eventsService: EventsService,
    private toastr: ToastrService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.eventForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dataStart: ['', Validators.required],
      dataEnd: ['', Validators.required],
      description: ['', Validators.required],
      telephone: [''],
      isPublished: [false],
      image: [''],
      direccion: [''],
      busquedad: [''],
      provincia: [''],
      region: [''],
    });
    this.id = this.activatedRouter.snapshot.paramMap.get('id');
  }

  // SE CARGA AL ABRIR LA PAGINA
  ngOnInit(): void {
    this.modifyEvent();
  }
  mergedData: Events;
  mergeFormValues() {
    const childFormValues = this.locationFormComponent.formMapas.value;
    this.mergedData = {
      ...this.eventForm.value,
      ...childFormValues,
    };
  }

  //ENVIAMOS EL FORMULARIO Y LO VALIDAMOS
  onFileSelect(event: any) {
    const file = (event.target as HTMLInputElement).files[0];
    this.eventForm.patchValue({ image: file });
    const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    this.mergeFormValues();

    if (this.eventForm.valid) {
      const EVENT: Events = {
        name: this.mergedData.name,
        email: this.mergedData.email,
        dataStart: this.mergedData.dataStart,
        dataEnd: this.mergedData.dataEnd,
        direccion: this.mergedData.direccion,
        busqueda: this.mergedData.busqueda,
        region: this.mergedData.region,
        provincia: this.mergedData.provincia,
        description: this.mergedData.description,
        telephone: this.mergedData.telephone,
        image: this.mergedData.image,
        isPublished: this.mergedData.isPublished,
      };
      if (this.id !== null) {
        this.eventsService.modifyEvent(this.id, EVENT).subscribe({
          next: (data) => {
            this.toastr.info(
              'El evento ha sido actualizado con exito',
              'Evento modificado'
            );
            this.router.navigate(['/dashboard']);
          },
          error: () => {
            this.eventForm.reset();
          },
        });
      } else {
        this.eventsService.createEvent(EVENT).subscribe({
          next: (data) => {
            this.toastr.success(
              'Hemos recibido su solicitud y esta en proceso de revisión.',
              'Formulario enviado con éxito!'
            );
            this.eventForm.reset();
          },
          error: (error) => {
            console.log(error, 'Form fail');
          },
        });
      }
    } else {
      this.eventForm.markAllAsTouched();
    }
  }

  // MODIFICAR EL EVENTO
  modifyEvent() {
    if (this.id !== null) {
      this.title = 'Editar evento';
      this.eventsService.getEvent(this.id).subscribe((data) => {
        console.log(data, 'modificar');
        const formattedStartDate = this.datePipe.transform(
          data.dataStart,
          'yyyy-MM-dd'
        );
        const formattedEndDate = this.datePipe.transform(
          data.dataEnd,
          'yyyy-MM-dd'
        );
        this.locationFormComponent.formMapas.controls['busqueda'].setValue(
          data.direccion + ',' + data.region + ',' + data.provincia
        ),
          this.eventForm.patchValue({
            name: data.name,
            email: data.email,
            dataStart: formattedStartDate,
            dataEnd: formattedEndDate,
            description: data.description,
            telephone: data.telephone,
            image: data.image,
          });
      });
    }
  }
}
