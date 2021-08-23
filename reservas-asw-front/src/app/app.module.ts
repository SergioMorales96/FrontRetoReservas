import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import localEs from '@angular/common/locales/es-CO';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localEs, 'es');

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

// NGRX
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { PrimeNgModule } from './prime-ng/prime-ng.module';

import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { appReducers } from './app.reducer';
import { CLoadService } from './auth/c-load.service';
import { CActiveGuard } from './auth/c-active.guard';
import { ReservationsModule } from './reservations/reservations.module';
import { ViewReservationComponent } from './reservations/components/reservation/view-reservation/view-reservation.component';
import { EditReservationComponent } from './reservations/components/reservation/edit-reservation/edit-reservation.component';
//import { MsalModule } from '@azure/msal-angular';
import { PublicClientApplication } from '@azure/msal-browser';
import { MSAL_CONFIG, MsalAngularConfiguration, MSAL_CONFIG_ANGULAR, MsalService } from '@azure/msal-angular';
import { Configuration } from 'msal';
import { HTTP_INTERCEPTORS} from '@angular/common/http';
//import { InterceptorService } from './http-services/interceptors/interceptor.service';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    PrimeNgModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    PrimeNgModule,
    SharedModule,
    StoreModule.forRoot(appReducers),
    ReservationsModule
  ],
  providers: [
    ConfirmationService,
    MessageService,
    CActiveGuard,
    CLoadService,
    { provide: LOCALE_ID, useValue: 'es-CO' },
    /*{
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },*/
    {
      provide: MSAL_CONFIG,
      useFactory: MSALConfigFactory
    },
    {
      provide: MSAL_CONFIG_ANGULAR,
      useFactory: MSALAngularConfigFactory
    },
    MsalService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

function MSALConfigFactory(): Configuration {
  return {
    auth: {
      clientId: '473482fb-2ddd-44f1-8332-7185bb10b914',
      authority: 'https://login.microsoftonline.com/bf208dcb-97e8-4d43-bd72-323680bef25c',
      validateAuthority: true,
      redirectUri: 'http://localhost:4200/',
      postLogoutRedirectUri: 'http://localhost:4200/',
      navigateToLoginRequestUrl: true
    },
    cache: {
      cacheLocation: 'localStorage',
      storeAuthStateInCookie: isIE,
    }
  };
}

function MSALAngularConfigFactory(): MsalAngularConfiguration {
  return {
    popUp: !isIE,
    consentScopes: [
      'user.read',
      'openid',
      'profile',
    ],
    protectedResourceMap: [
      ['https://graph.microsoft.com/v1.0/me', ['user.read']]
    ],
    extraQueryParameters: {}
  };

}

