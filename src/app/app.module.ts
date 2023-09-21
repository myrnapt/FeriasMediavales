import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {NgcCookieConsentModule, NgcCookieConsentConfig} from 'ngx-cookieconsent';

import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/home/header/header.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { OrganizerComponent } from './pages/organizers/organizer/organizer.component';
import { HomeComponent } from './pages/home/home.component';
import { SearchbarComponent } from './pages/home/header/searchbar/searchbar.component';
import { EventPreviewsComponent } from './pages/home/event-previews/event-previews.component';
import { FaqComponent } from './pages/home/faq/faq.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FairsComponent } from './pages/fairs/fairs.component';
import { ErrorPageComponent } from './pages/errorPage/errorPage.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './auth/auth.module';

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
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    OrganizerComponent,
    HomeComponent,
    SearchbarComponent,
    EventPreviewsComponent,
    FaqComponent,
    ContactComponent,
    FairsComponent,
    ErrorPageComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgcCookieConsentModule.forRoot(cookieConfig),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    NoopAnimationsModule,
    AuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
