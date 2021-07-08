import { Component } from '@angular/core';
import { Room, DominioEstado, RoomResponse } from '../../../interfaces/admin.interfaces';
import { RouteName } from '../../../../../utils/enums';
import { RoomsService } from '../../../services/rooms.service';

@Component({
  selector: 'app-list-room',
  templateUrl: './list-room.component.html',
  styleUrls: ['./list-room.component.scss']
})
export class ListRoomComponent {
  routeName = RouteName;
  rooms: Room[] = [
    {
      "idSala": 1,
      "aforoMax": 6,
      "dominioEstado": DominioEstado.A,
      "idPiso": 1,
      "nombre": "SALA 1"
    },
    {
      "idSala": 2,
      "aforoMax": 6,
      "dominioEstado": DominioEstado.A,
      "idPiso": 1,
      "nombre": "SALA 2"
    },
    {
      "idSala": 3,
      "aforoMax": 6,
      "dominioEstado": DominioEstado.A,
      "idPiso": 1,
      "nombre": "SALA 3"
    },
    {
      "idSala": 4,
      "aforoMax": 5,
      "dominioEstado": DominioEstado.A,
      "idPiso": 2,
      "nombre": "SALA 1"
    },
    {
      "idSala": 5,
      "aforoMax": 5,
      "dominioEstado": DominioEstado.A,
      "idPiso": 2,
      "nombre": "SALA 2"
    },
    {
      "idSala": 6,
      "aforoMax": 5,
      "dominioEstado": DominioEstado.A,
      "idPiso": 2,
      "nombre": "SALA 3"
    },
    {
      "idSala": 7,
      "aforoMax": 5,
      "dominioEstado": DominioEstado.A,
      "idPiso": 3,
      "nombre": "SALA 1"
    },
    {
      "idSala": 8,
      "aforoMax": 5,
      "dominioEstado": DominioEstado.A,
      "idPiso": 3,
      "nombre": "SALA 2"
    },
    {
      "idSala": 9,
      "aforoMax": 5,
      "dominioEstado": DominioEstado.A,
      "idPiso": 3,
      "nombre": "SALA 3"
    },
    {
      "idSala": 10,
      "aforoMax": 7,
      "dominioEstado": DominioEstado.A,
      "idPiso": 3,
      "nombre": "SALA 4"
    },
    {
      "idSala": 11,
      "aforoMax": 6,
      "dominioEstado": DominioEstado.A,
      "idPiso": 2,
      "nombre": "SALA 4"
    }
  ];

  constructor(
    private roomsService: RoomsService
  ) {

  }

  deleteRoom( id: number ): void {
    this.roomsService.deleteRoom(id)
        .subscribe(
          (roomResponse: RoomResponse) => this.rooms = this.rooms.filter((room: Room) => room.idSala !== id)
        );
  }
}
