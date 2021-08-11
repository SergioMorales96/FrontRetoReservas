import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { PrimeNgModule } from './prime-ng/prime-ng.module';

import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { CLoadService } from './auth/c-load.service';
import { CActiveGuard } from './auth/c-active.guard';

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
    BrowserAnimationsModule,
    BrowserModule,
  ],
  providers: [
    ConfirmationService,
    MessageService,
    CActiveGuard,
    CLoadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }