import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouteName } from 'src/utils/enums';
import { Domain, DomainsResponse, DomainResponse } from '../../../interfaces/domains.interfaces';
import { DomainsService } from '../../../services/domains.service';

@Component({
  selector: 'app-view-domain',
  templateUrl: './view-domain.component.html',
  styles: [
  ]
})
export class ViewDomainComponent implements OnInit {

  domain!: Domain;
  routeName = RouteName;

  get viewTitle(): string {
    return this.domain?.codigoDominio ? this.domain.codigoDominio : 'Ver Dominio';
  }

  constructor(
    private activateRoute: ActivatedRoute,
    private domainsService: DomainsService

  ) { }

  ngOnInit(): void {
    this.activateRoute.params
      .subscribe(({ codigoDominio, valorDominio, descripcion }) => {
        if (codigoDominio && valorDominio && descripcion) {
          this.getDomain(codigoDominio, valorDominio, descripcion);
        }
      });
  }

  getDomain(codigoDominio: string, valorDominio: string, descripcion: string): void {
    this.domainsService.getDomain(codigoDominio, valorDominio, descripcion)
      .subscribe(
        (DomainResponse: DomainResponse) => this.domain = DomainResponse.data
      )

  }

}
