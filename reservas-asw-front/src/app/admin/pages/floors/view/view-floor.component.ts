import { Component, OnInit } from '@angular/core';
import { Floor } from '../../../interfaces/admin.interfaces';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view-floor.component.html',
  styles: [
  ]
})
export class ViewFloorComponent implements OnInit {

  floor!: Floor;

  get viewTitle(): string{
    return this.floor.nombre ? this.floor.nombre: 'Ver piso'
  }
  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
    .subscribe(({ id }) => {
      if ( id ){
        console.log('floor id', id);

        this.floor = {
          idPiso: 6,
          aforoMaximo: 501,
          idSucursal: 1,
          nombre:"Piso pruebamodi",
          numeroPiso: 22,
          
        }
      }
    });
  }

}
