import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Domain, DomainsResponse, DomainResponse } from '../../../interfaces/admin.interfaces';
import { DomainsService } from '../../../services/domains.service';

@Component({
  selector: 'app-view-domain',
  templateUrl: './view-domain.component.html',
  styles: [
  ]
})
export class ViewDomainComponent implements OnInit{
  domain!: Domain;

  get viewTitle(): string {
    return this.domain?.codigoDominio ? this.domain.codigoDominio : 'Ver Dominio';
  }
  constructor(
    private activateRoute: ActivatedRoute,
    private domainsService: DomainsService

  ) {}
  ngOnInit(): void {
    this.activateRoute.params
      .subscribe(({ codigo }) => {
        if ( codigo ) {
          this.getDomain( codigo); 
        }
      });
    }
    getDomain(codigo: string):void{
      this.domainsService.getDomain(codigo)
        .subscribe(
          (DomainResponse: DomainResponse)=>this.domain= DomainResponse.data
        )

    }

}
