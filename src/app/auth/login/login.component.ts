import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

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
  ) {
    this.form = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  onSubmit() {
    this.authService.login(this.form.value)
    .then(() => this.router.navigate(['/dashboard']))
    .catch(error => console.log(error));
  }

}
