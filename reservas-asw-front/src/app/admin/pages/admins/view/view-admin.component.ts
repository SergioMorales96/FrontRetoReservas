import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Administrador } from 'src/app/admin/interfaces/admin.interfaces';

@Component({
  selector: 'app-view-admin',
  templateUrl: './view-admin.component.html',
  styles: [
  ]
})
export class ViewAdminComponent implements OnInit{
  admin!: Administrador;

  get viewTitle(): string {
    return this.admin.email ? this.admin.email : 'Ver administrador';
  }

  constructor(
    private activatedRoute:ActivatedRoute
  ) {
    
   }
  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(({ id }) => {
        if (id) {
          console.log('admin id', id);

          this.admin = {
            idAdministrador: 1,
            email: 'spinilla@asesoftware.com',
            idSucursal: 1,
            nombreSucursal: 'TORRE SIGMA',
          }
        }


      }
      );
  }

}
