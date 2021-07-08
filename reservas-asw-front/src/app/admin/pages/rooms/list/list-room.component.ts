import { Component } from '@angular/core';
import { Room, DominioEstado, RoomResponse, RoomsResponse } from '../../../interfaces/admin.interfaces';
import { RouteName } from '../../../../../utils/enums';
import { RoomsService } from '../../../services/rooms.service';

@Component({
  selector: 'app-list-room',
  templateUrl: './list-room.component.html',
  styleUrls: ['./list-room.component.scss']
})
export class ListRoomComponent {
  routeName = RouteName;
  rooms: Room[] = [];

  constructor(
    private roomsService: RoomsService
  ) { }

  ngOnInit(): void {
    this.getRooms();
  }

  getRooms(): void {
    this.roomsService.getRooms()
      .subscribe(
        (roomsResponse: RoomsResponse) => this.rooms = roomsResponse.data
      );
  }

  deleteRoom( id: number ): void {
    this.roomsService.deleteRoom(id)
        .subscribe(
          (roomResponse: RoomResponse) => this.rooms = this.rooms.filter((room: Room) => room.idSala !== id)
        );
  }
}
