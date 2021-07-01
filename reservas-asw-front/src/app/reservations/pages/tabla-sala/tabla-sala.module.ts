import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponenteSalaComponent } from './componente-sala/componente-sala.component';



@NgModule({
  declarations: [
    ComponenteSalaComponent
  ],
  exports:[
    ComponenteSalaComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TablaSalaModule { }
