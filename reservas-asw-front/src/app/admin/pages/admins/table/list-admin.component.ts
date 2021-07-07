import { Component, } from '@angular/core';
import { Administrador } from '../../../interfaces/admin.interfaces';

@Component({
  selector: 'app-list-admin',
  templateUrl: './list-admin.component.html',
  styles: [
  ]
})
export class ListAdminComponent {
  admins: Administrador[] = [
    {
      "idAdministrador": 1,
      "email": "spinilla@asesoftware.com",
      "idSucursal": 1,
      "nombreSucursal": "TORRE SIGMA"
  },
  {
      "idAdministrador": 3,
      "email": "spinilla@asesoftware.com",
      "idSucursal": 1,
      "nombreSucursal": "TORRE SIGMA"
  }
  ]

  selectedAdmin!:Administrador;

  deleteAdmin():void {};
}
