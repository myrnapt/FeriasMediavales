//MODULES
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgcCookieConsentModule, NgcCookieConsentConfig} from 'ngx-cookieconsent';
import { ToastrModule } from 'ngx-toastr';

//COMPONENTS
import { AppComponent } from './app.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ErrorPageComponent } from './pages/errorPage/errorPage.component';
import { EventPreviewsComponent } from './pages/home/event-previews/event-previews.component';
import { FairsComponent } from './pages/fairs/fairs.component';
import { FairPageComponent } from './pages/fairs/fair-page/fair-page.component';
import { FaqComponent } from './pages/home/faq/faq.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './pages/home/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SearchbarComponent } from './pages/fairs/searchbar/searchbar.component';

//DATABASE
import { environment } from 'src/environments/environment';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { NewEventFormComponent } from './pages/contact/new-event-form/new-event-form.component';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { LocationFormComponent } from './pages/contact/new-event-form/location-form/location-form.component';

//COOKIES CONFIGURATION
const cookieConfig:NgcCookieConsentConfig = {
  "cookie": {
    "domain": "localhost"
  },
  "position": "bottom",
  "theme": "classic",
  "palette": {
    "popup": {
      "background": "#000000",
      "text": "#ffffff",
      "link": "#ffffff"
    },
    "button": {
      "background": "#6a682f",
      "text": "#ffffff",
      "border": "transparent"
    }
  },
  "type": "info",
  "content": {
    "message": "Esta web utiliza cookies para asegurarle una mejor experiencia de navegación",
    "dismiss": "Aceptar",
    "deny": "",
    "link": "Politica de privacidad",
    "href": "https://cookiesandyou.com",
    "policy": "Cookie Policy"
  }
};

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    ErrorPageComponent,
    EventPreviewsComponent,
    FairsComponent,
    FairPageComponent,
    FaqComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    NavbarComponent,
    NewEventFormComponent,
    SearchbarComponent,
    LocationFormComponent,
    
  ],
  imports: [
    AppRoutingModule,
    AuthModule,
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgcCookieConsentModule.forRoot(cookieConfig),
    NoopAnimationsModule,
    provideAuth(() => getAuth()),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
