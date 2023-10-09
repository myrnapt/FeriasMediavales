import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'shared-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  form: any
  constructor( 
    private formBuilder: FormBuilder,
    private toastr: ToastrService) 
  {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
  })
  }

   onSubmit(){
    if (this.form.valid) {
      this.toastr.success('Has sido subscrito al newsletter', '¡Exito!')
    } else {
       this.form.markAllAsTouched() 
    }
   }


}
