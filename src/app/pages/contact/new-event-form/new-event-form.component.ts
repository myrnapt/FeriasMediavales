import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Events } from 'src/app/interfaces/events.interface';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'pages-contact-new-event-form',
  templateUrl: './new-event-form.component.html',
  styleUrls: ['./new-event-form.component.scss']
})
export class NewEventFormComponent {

  eventForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private eventsService: EventsService,
    private toastr: ToastrService,
  ) {
    this.eventForm = this.formBuilder.group({
      nombreEvento: ['', Validators.required,],
      email: ['', [Validators.required, Validators.email]],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      ubicacion: ['', Validators.required],
      descripcion: ['', Validators.required],
      organizador: [''], 
      telefono: [''], 
      precio: [''], 
      imagen: [''], 
    });
  }

  onSubmit() {
    
    const EVENT: Events = {
      name: this.eventForm.get('nombreEvento').value,
      email: this.eventForm.get('email').value,
      dataStart: this.eventForm.get('fechaInicio').value,
      dataEnd: this.eventForm.get('fechaFin').value,
      lat: this.eventForm.get('ubicacion').value,
      lng: this.eventForm.get('ubicacion').value,
      description: this.eventForm.get('descripcion').value,
      organizer: this.eventForm.get('organizador')?.value,
      telephone: this.eventForm.get('telefono')?.value,
      price: this.eventForm.get('precio')?.value,
      image: this.eventForm.get('imagen')?.value,
    }
    console.log(EVENT);
    this.toastr.success('El formulario ha sido enviado correctamente','Formulario enviado!');
    this.eventForm.reset()

    // if (this.eventForm.valid) {
    //   const formData = this.eventForm.value;
    //   this.eventsService.addEvent(formData)
    //   .subscribe((response) => {
    //       alert('Evento agregado con éxito:');
    //     },
    //     (error) => {
    //       alert('Error al agregar el evento:' + error);
    //     }
    //   );
    // } else { this.eventForm.markAllAsTouched() }
  }

}
