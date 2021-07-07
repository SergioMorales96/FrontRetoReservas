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
      "idSucursal" :1,
      "nombre": "torre sigma 1",
      "direccion":"lala",
      "nit": "asesoftware",
      "aforoMaximoBranches":    23
    },
    {
      "idSucursal" :2,
      "nombre": "torre sigma 2",
      "direccion":"lala2",
      "nit": "asesoftware",
      "aforoMaximoBranches":    24
    }
  ];

  constructor(
    
  ) {

  }

  deleteBranch( id: number ): void {
    console.log( id );
  }

}
