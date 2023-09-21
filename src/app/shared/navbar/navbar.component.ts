import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'shared-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  
  constructor(private authService: AuthService) {}

  get isUserLoggedIn(): boolean {
    return this.authService.isUserLoggedIn();
  }

}
