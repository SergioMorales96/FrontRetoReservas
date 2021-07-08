import { Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-domain',
  templateUrl: './add-domain.component.html',
  styles: [
  ]
})
export class AddDomainComponent  {
  domainForm = this.fb.group({
    codigoDominio: [''],
    valorDominio: [''],
    descripcion: ['']

  });

  constructor(
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.activateRoute.params
      .subscribe(({ codigoDominio })=>console.log( codigoDominio ))
   }
   saveDomain(): void{
     

   }


}
