import { Component} from '@angular/core';
import { RouteName } from '../../../../../utils/enums';
import { DominioEstado, DominioTipo, NombrePiso, Workstation } from '../../../interfaces/admin.interfaces';

@Component({
  selector: 'app-list-workstation',
  templateUrl: './list-workstation.component.html',
  styleUrls: ['./list-workstation.component.scss']
})
export class ListWorkstationComponent {

  routeName = RouteName;
  workstations: Workstation[] = [

    {
      "idPuestoTrabajo": 1,
      "dominioEstado": DominioEstado.A,
      "dominioTipo": DominioTipo.Pt,
      "idPiso": 1,
      "nombre": "Nombre_Puesto_Trabajo_# 1",
      "nombrePiso": NombrePiso.Piso18 },
  {
      "idPuestoTrabajo": 2,
      "dominioEstado": DominioEstado.A,
      "dominioTipo": DominioTipo.G,
      "idPiso": 1,
      "nombre": "Nombre_Puesto_Trabajo_# 2",
      "nombrePiso": NombrePiso.Piso18
  },
  {
      "idPuestoTrabajo": 3,
      "dominioEstado": DominioEstado.A,
      "dominioTipo": DominioTipo.Pt,
      "idPiso": 1,
      "nombre": "Nombre_Puesto_Trabajo_# 3",
      "nombrePiso": NombrePiso.Piso18
  },
  {
      "idPuestoTrabajo": 4,
      "dominioEstado": DominioEstado.A,
      "dominioTipo": DominioTipo.Pt,
      "idPiso": 2,
      "nombre": "Nombre_Puesto_Trabajo_# 1",
      "nombrePiso": NombrePiso.Piso19
  },
  {
      "idPuestoTrabajo": 5,
      "dominioEstado": DominioEstado.A,
      "dominioTipo": DominioTipo.Pt,
      "idPiso": 2,
      "nombre": "Nombre_Puesto_Trabajo_# 2",
      "nombrePiso": NombrePiso.Piso19
  },
  {
      "idPuestoTrabajo": 6,
      "dominioEstado": DominioEstado.A,
      "dominioTipo": DominioTipo.Pt,
      "idPiso": 2,
      "nombre": "Nombre_Puesto_Trabajo_# 3",
      "nombrePiso": NombrePiso.Piso19
  },
  {
      "idPuestoTrabajo": 7,
      "dominioEstado": DominioEstado.A,
      "dominioTipo": DominioTipo.Pt,
      "idPiso": 3,
      "nombre": "Nombre_Puesto_Trabajo_# 1",
      "nombrePiso": NombrePiso.Piso20
  },
  {
      "idPuestoTrabajo": 8,
      "dominioEstado": DominioEstado.A,
      "dominioTipo": DominioTipo.Pt,
      "idPiso": 3,
      "nombre": "Nombre_Puesto_Trabajo_# 2",
      "nombrePiso": NombrePiso.Piso20
  },
  {
      "idPuestoTrabajo": 9,
      "dominioEstado": DominioEstado.A,
      "dominioTipo": DominioTipo.G,
      "idPiso": 3,
      "nombre": "Nombre_Puesto_Trabajo_# 3",
      "nombrePiso": NombrePiso.Piso20
  }

  ]

  constructor() { }

  deleteWorkstation( id: number ): void {
    console.log( id );
  }

}
