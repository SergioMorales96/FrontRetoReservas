import { Component, OnInit } from '@angular/core';
import {  FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Domain, DomainClass, DomainResponse } from '../../../interfaces/admin.interfaces';
import { RouteName } from '../../../../../utils/enums';
import { DomainsService } from '../../../services/domains.service';

@Component({
  selector: 'app-form-domain',
  templateUrl: './form-domain.component.html',
  styles: [
  ]
})
export class FormDomainComponent implements OnInit {
  domainForm = this.fb.group({
    codigoDominio: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    valorDominio: ['',[Validators.required,Validators.minLength(1), Validators.maxLength(100)]],
    descripcion: ['',[Validators.required,Validators.minLength(1), Validators.maxLength(100)]]

  });

  isEditing: boolean = false;
  domain!: Domain;
  
  get formTitle(): string {
    return this.isEditing ? ( this.domain?.codigoDominio ?? 'Editar dominio' ) : 'Crear dominio';
  }

  get buttonLabel(): string {
    return this.isEditing ? 'Actualizar' : 'Crear';
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private domainsService: DomainsService,
    private router: Router,
  ) { }

  ngOnInit():void{
      this.activatedRoute.params
        .subscribe(({codigo})=>{
            if(codigo){
                this.isEditing = true;
                this.getDomains(codigo);              
            }else{
                this.domain = new DomainClass();
            }           
        });
  }

getDomains(codigo: string):void{
    this.domainsService.getDomain(codigo)
      .subscribe(
        (domainResponse: DomainResponse)=>{
            this.domain= domainResponse.data;
            this.setDomain(this.domain);
        }
      )
}
setDomain(domain: Domain):void{
        this.domainForm.controls['codigoDominio'].setValue(domain.codigoDominio);
        this.domainForm.controls['valorDominio'].setValue(domain.valorDominio);
        this.domainForm.controls['descripcion'].setValue(domain.descripcion);
}
getDomainFormValue():Domain {
        return{
            codigoDominio: this.domainForm.controls['codigoDominio'].value,
            valorDominio: this.domainForm.controls['valorDominio'].value,
            descripcion: this.domainForm.controls['descripcion'].value,            
        }
}
save(): void{
  if(this.isEditing){
    this.domainsService.updateDomain({
      ...this.getDomainFormValue(),
      codigoDominio: this.domain.codigoDominio
     })
        .subscribe(
          (domainResponse: DomainResponse)=> this.router.navigateByUrl(RouteName.DomainsList)
           );
        }else{
          this.domainsService.createDomain(this.getDomainFormValue())
          .subscribe(
              (domainResponse: DomainResponse)=> this.router.navigateByUrl(RouteName.DomainsList)
          )

        }
      }
}
