import { Component, OnInit } from '@angular/core';
import { Domain, DomainsResponse, DomainResponse } from '../../../interfaces/domains.interfaces';
import { RouteName } from '../../../../../utils/enums';
import { DomainsService } from '../../../services/domains.service';
import { ToastsService } from '../../../../services/toasts.service';
import { AlertsService } from '../../../../services/alerts.service';


@Component({
  selector: 'app-list-domain',
  templateUrl: './list-domain.component.html',
  styleUrls: ['../../../adminList.scss']
})
export class ListDomainComponent implements OnInit {
  routeName = RouteName;
  domains: Domain[] = [];

  constructor(
    private domainsService: DomainsService,
    private toastService: ToastsService,
    private alertsService: AlertsService
  ) { }

  ngOnInit(): void {
    this.getDomains();
  }

  getDomains() {
    this.domainsService.getDomains()
      .subscribe(
        (domainsResponse: DomainsResponse) => this.domains = domainsResponse.data
      );
  }

  deleteDomain(_domain: Domain): void {
    this.alertsService.showConfirmDialog({
      message: '¿Desea eliminar el dominio, esta acción no se podrá revertir?',
      header: 'Eliminar dominio',
    })
      .then(resp => {
        if (resp) {
          this.domainsService.deleteDomain(_domain)
            .subscribe(
              (domainResponse: DomainResponse) => {
                this.domains = this.domains.filter((domain: Domain) => domain.codigoDominio !== _domain.codigoDominio && domain.valorDominio !== _domain.valorDominio && domain.descripcion !== _domain.descripcion);
                this.toastService.showToastSuccess({ summary: 'Dominio eliminado', detail: 'El dominio ha sido eliminado correctamente.' });
              }
            );
        } else {
          return;
        }
      })
      .catch(console.log);
  }
}

