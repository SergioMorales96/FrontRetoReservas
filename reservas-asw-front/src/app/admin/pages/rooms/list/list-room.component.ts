import { Component } from '@angular/core';
import { Room, RoomResponse , RoomsResponse } from '../../../interfaces/rooms.interfaces';
import { RouteName } from '../../../../../utils/enums';
import { RoomsService } from '../../../services/rooms.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { ToastsService } from 'src/app/services/toasts.service';

@Component({
  selector: 'app-list-room',
  templateUrl: './list-room.component.html',
  styleUrls: ['./list-room.component.scss']
})
export class ListRoomComponent {
  
  routeName = RouteName;
  rooms: Room[] = [];

  constructor(
    private roomsService: RoomsService,
    private toastService: ToastsService,
    private alertsService: AlertsService
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
    this.alertsService.showConfirmDialog({
      message: '¿Desea eliminar la sala, esta acción no se podrá revertir?',
      header: 'Eliminar sala',
    })
      .then(resp => {
        if (resp) {
          this.roomsService.deleteRoom(id)
            .subscribe(
              (roomResponse: RoomResponse) => {
                this.rooms = this.rooms.filter((room: Room) => room.idSala !== id);
                this.toastService.showToastSuccess({ summary: 'Sala eliminada', detail: 'La sala ha sido eliminada correctamente.' });
              }
            );
        } else {
          return;
        }
      })
      .catch(console.log);
  }
}
