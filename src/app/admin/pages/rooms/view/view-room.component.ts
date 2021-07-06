import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Room, DominioEstado } from '../../../interfaces/admin.interfaces';

@Component({
  selector: 'app-view',
  templateUrl: './view-room.component.html',
  styles: [
  ]
})
export class ViewRoomComponent implements OnInit {
  room!: Room;

  get viewTitle(): string {
    return this.room.nombre ? this.room.nombre : 'Ver sala';
  }

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(({ id }) => {
        if ( id ) {
          console.log( 'room id', id );

          this.room = {
            idSala: 1,
            aforoMax: 6,
            dominioEstado: DominioEstado.A,
            idPiso: 1,
            nombre: "SALA 1"
          }
        }
      });
  }

}
