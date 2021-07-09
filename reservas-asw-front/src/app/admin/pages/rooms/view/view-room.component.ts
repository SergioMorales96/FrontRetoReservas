import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Room, RoomResponse } from '../../../interfaces/rooms.interfaces';
import { RoomsService } from '../../../services/rooms.service';

@Component({
  selector: 'app-view',
  templateUrl: './view-room.component.html',
  styles: [
  ]
})
export class ViewRoomComponent implements OnInit {
  room!: Room;

  get viewTitle(): string {
    return this.room?.nombre ? this.room.nombre : 'Ver sala';
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private roomsService: RoomsService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(({ id }) => {
        if ( id ) {
          this.getRoom(id);
        }
      });
  }

  getRoom(id: Number): void{
    this.roomsService.getRoom(id)
      .subscribe(
        (roomResponse: RoomResponse) => this.room = roomResponse.data
      );
  }

}
