import { Component } from '@angular/core';
import { Floor } from '../../../interfaces/floors.interfaces';
import { RouteFloor } from '../../../../../utils/enums';

@Component({
  selector: 'app-list-floor',
  templateUrl: './list-floor.component.html',
  styleUrls: ['./list-floor.component.scss']
})
export class ListfloorComponent{
  routeFloor=RouteFloor;
  floors: Floor[] = [
    {
      "idPiso": 6,
      "aforoMaximo": 501,
      "idSucursal": 1,
      "nombre": "Piso pruebamodi",
      "numeroPiso": 22,
      "nombreSucursal": "TORRE SIGMA"
  },
  {
      "idPiso": 4,
      "aforoMaximo": 500,
      "idSucursal": 1,
      "nombre": "Piso prueba",
      "numeroPiso": 20,
      "nombreSucursal": "TORRE SIGMA"
  },
  {
      "idPiso": 7,
      "aforoMaximo": 50,
      "idSucursal": 1,
      "nombre": "Piso prueba",
      "numeroPiso": 22,
      "nombreSucursal": "TORRE SIGMA"
  },
  {
      "idPiso": 1,
      "aforoMaximo": 100,
      "idSucursal": 1,
      "nombre": "Piso 18",
      "numeroPiso": 18,
      "nombreSucursal": "TORRE SIGMA"
  },
  {
      "idPiso": 2,
      "aforoMaximo": 100,
      "idSucursal": 1,
      "nombre": "Piso 19",
      "numeroPiso": 19,
      "nombreSucursal": "TORRE SIGMA"
  },
  {
      "idPiso": 3,
      "aforoMaximo": 100,
      "idSucursal": 1,
      "nombre": "Piso 20",
      "numeroPiso": 20,
      "nombreSucursal": "TORRE SIGMA"
  }
  ];
  constructor(
    
    ) {
  
    }
  
    deleteFloor( id: number ): void {
      console.log( id );
    }

  
}
