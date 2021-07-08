import { Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Domain } from '../../../interfaces/admin.interfaces';

@Component({
  selector: 'app-view-domain',
  templateUrl: './view-domain.component.html',
  styles: [
  ]
})
export class ViewDomainComponent {
  domain!: Domain;

  get viewTitle(): string {
    return this.domain.codigoDominio ? this.domain.codigoDominio : 'Ver Dominio';
  }
  constructor(
    private activateRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.activateRoute.params
      .subscribe(({ id }) => {
        if ( id ) {
          console.log( 'codigoDominio', id );

          
        }
      });
    }

}
