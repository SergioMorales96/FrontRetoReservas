import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DominioEstado, DominioTipo, NombrePiso, Workstation } from 'src/app/admin/interfaces/admin.interfaces';

@Component({
  selector: 'app-view-workstation',
  templateUrl: './view-workstation.component.html',
  styles: [
  ]
})
export class ViewWorkstationComponent implements OnInit {
  workstation!: Workstation;
  get viewTitle(): string {
    return this.workstation.nombre ? this.workstation.nombre : 'Ver puesto de trabajo';
  }

  constructor(   private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.params
    .subscribe(({ id }) => {
      if ( id ) {
        
        console.log( 'puesto id', id );

        this.workstation = {
          idPuestoTrabajo: 1,
          dominioEstado: DominioEstado.A,
          dominioTipo: DominioTipo.G,
          idPiso: 1,
          nombre: "Nombre_Puesto_Trabajo_prueba",
          nombrePiso: NombrePiso.Piso18,
        }

        
      }
    });



  }

}
