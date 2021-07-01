import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { PrimeNgModule } from './prime-ng/prime-ng.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { TablaSalaModule } from './reservations/pages/tabla-sala/tabla-sala.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    PrimeNgModule,
    SharedModule,
    TablaSalaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
