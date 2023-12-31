import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent{
  form: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required,],
    });
  }

  onSubmit() {

    if (this.form.valid) {
      this.authService.login(this.form.value)
      .then(() => this.router.navigate(['/dashboard']))
      .catch(() => this.toastr.error('Usuario o contraseña incorrectos', 'Error de login')
      );
    } else { 
      this.form.markAllAsTouched();
      this.toastr.error('Usuario o contraseña incorrectos', 'Error de login')
     }
  }

}
