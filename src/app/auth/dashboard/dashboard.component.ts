import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'auth-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit  {
  
  readonly APIUrl = "http://localhost:5038/api/mercados-mediavales/"
  eventName: string = ''

  constructor(
    private http: HttpClient,
    private authService: AuthService, 
    private router: Router) 
    {}
 
  logout() {
    if (!confirm('Seguro que quieres cerrar sesion?')) return;
    this.authService.logout()
      .then(() => this.router.navigate(['/login']))
      .catch((error) => console.log(error));
  }

  events: any = [];

  refreshNotes(){
    this.http.get(this.APIUrl+'get-mercados').subscribe(data => {
      this.events = data;
    })
  }

  ngOnInit() {
    this.refreshNotes();
  }

  addEvent() {
    let newEvent = this.eventName; // Use the property here
    let formData = new FormData();
    console.log(newEvent + 'New event');
    formData.append("name", newEvent);
    this.http.post(this.APIUrl + 'add-mercados', formData).subscribe(data => {
      this.refreshNotes(); console.log(data + 'data');
    });
  }

  deleteEvent(id: any) {
    this.http.delete(this.APIUrl+'delete-mercado?id'+id).subscribe( data => {
      this.refreshNotes();
    })
  }

  redirigirARuta() {
    this.router.navigate(['/formulario']);
  }
}
