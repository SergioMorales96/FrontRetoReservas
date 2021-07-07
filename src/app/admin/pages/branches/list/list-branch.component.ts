import { Component } from '@angular/core';
import { RouteName } from 'src/utils/enums';
import { Branch } from '../../../interfaces/admin.interfaces';

@Component({
  selector: 'app-list-branch',
  templateUrl: './list-branch.component.html',
  styleUrls: ['./list-branch.component.scss']
})
export class ListBranchComponent {
  routeName = RouteName;
  branches: Branch[] = [
    {
      "idSucursal":     1,
      "aforoMaximo":    23,
      "direccion":      "lala",
      "nit":            9000,
      "nombre":         "torre",
      "nombreEmpresa":  "asesoftware"
    },
    {
      "idSucursal":     2,
      "aforoMaximo":    24,
      "direccion":      "lala",
      "nit":            9000,
      "nombre":         "torre",
      "nombreEmpresa":  "asesoftware"
    },

  ];

  constructor(
    
  ) {

  }

  deleteBranch( id: number ): void {
    console.log( id );
  }

}
