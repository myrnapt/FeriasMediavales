import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'auth-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  
  form: FormGroup;

  constructor(
    private authService: AuthService, 
    private eventsService: EventsService,
    private router: Router) {
      this.form = new FormGroup({
        name: new FormControl()
      })
    }

  ngOnInit(): void {}

  logout() {
    if (!confirm('Seguro que quieres cerrar sesion?')) return;
    this.authService.logout()
      .then(() => this.router.navigate(['/login']))
      .catch((error) => console.log(error));
  }

  async onSubmit() {
    const resp = await this.eventsService.addPlace(this.form.value);
    console.log(resp);

  }
}
