import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

// NGRX
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { PrimeNgModule } from './prime-ng/prime-ng.module';

import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { appReducers } from './app.reducer';

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
    StoreModule.forRoot( appReducers )
  ],
  providers: [
    ConfirmationService,
    MessageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }