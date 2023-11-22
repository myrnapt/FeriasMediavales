import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'shared-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  
  constructor(
    private authService: AuthService,
    private router: Router, 
    private viewportScroller: ViewportScroller) {}

  get isUserLoggedIn(): boolean {
    return this.authService.isUserLoggedIn();
  }

  scrollToComponent(componentId: string): void {
    this.router.navigate([], {
      fragment: componentId,
      queryParamsHandling: 'merge',
      preserveFragment: true,
    });

    this.viewportScroller.scrollToAnchor(componentId);
  }

}
