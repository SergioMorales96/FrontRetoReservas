import { Component, OnInit } from '@angular/core';
import { Domain, DomainsResponse, DomainResponse } from '../../../interfaces/admin.interfaces';
import { RouteName } from '../../../../../utils/enums';
import { DomainsService } from '../../../services/domains.service';


@Component({
  selector: 'app-list-domain',
  templateUrl: './list-domain.component.html',
  styleUrls: ['./list-domain.component.scss' ]
})
export class ListDomainComponent implements OnInit{
  routeName =RouteName;
  domains: Domain[]=[];
  constructor(
      private domainsService: DomainsService,
  ) {} 
  ngOnInit():void{
      this.getDomains();
  }
  getDomains(){
      this.domainsService.getDomains()
      .subscribe(
            (domainsResponse: DomainsResponse)=> this.domains = domainsResponse.data
        );
  }
  deleteDomain(_domain: Domain): void{
      this.domainsService.deleteDomain(_domain)
        .subscribe(
            (domainResponse: DomainResponse)=>this.domains = this.domains.filter((domain: Domain)=>domain.codigoDominio !== _domain.codigoDominio && domain.valorDominio !== _domain.valorDominio && domain.descripcion !== _domain.descripcion)
        );
  }
}

