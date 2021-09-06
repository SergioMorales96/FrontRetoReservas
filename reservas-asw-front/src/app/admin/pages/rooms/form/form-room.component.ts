import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Floor, FloorResponse } from '../../../interfaces/interface.schedule';
import { Room, RoomResponse, RoomClass } from '../../../interfaces/rooms.interfaces';
import { RoomsService } from '../../../services/rooms.service';
import { RouteName, WorkStationState } from '../../../../../utils/enums';
import { ToastsService } from 'src/app/services/toasts.service';
import { Domain, DomainResponse, DomainsResponse } from '../../../interfaces/domains.interfaces';

@Component({
  selector: 'app-form',
  templateUrl: './form-room.component.html',
  styleUrls: ['./form-room.component.scss']
})
export class FormRoomComponent implements OnInit {
  roomForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    maxCapacity: ['', [Validators.required]],
    domainState: ['', [Validators.required]],
    floorId: ['', [Validators.required]]
  });

  floors: Floor[] = [];
  domains: Domain[] = [];
  isEditing: boolean = false;
  room!: Room;
  routeName = RouteName;

  get formTitle(): string {
    return this.isEditing ? ( this.room?.nombre ?? 'Editar sala' ) : 'Crear sala';
  }

  get buttonLabel(): string {
    return this.isEditing ? 'Actualizar' : 'Crear';
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private roomsService: RoomsService,
    private router: Router,
    private toastService: ToastsService
  ) { }

  ngOnInit(): void {
    this.getFloors();
    this.getDomains();
    this.activatedRoute.params
      .subscribe(({ id }) => {
        if ( id ) {
          this.isEditing = true;
          this.getRoom(id);
        }else{
          this.room = new RoomClass();
        }
      });
  }

  getFloors(): void {
    this.roomsService.getFloors()
      .subscribe(
        (floorsResponse: FloorResponse) => this.floors = floorsResponse.data
      );
  }

  getRoom(id: Number): void{
    this.roomsService.getRoom(id)
      .subscribe(
        (roomResponse: RoomResponse) => {
          this.room = roomResponse.data;
          this.setRoom(this.room);
        }
      );
  }

  getDomains(): void{
    this.roomsService.getDomains("ESTADO_SALA")
      .subscribe(
        (domainsResponse: DomainsResponse) => {
          this.domains = domainsResponse.data
          console.log(this.domains);
        }
      );
  }

  setRoom( room: Room ): void {
    this.roomForm.controls['name'].setValue( room.nombre );
    this.roomForm.controls['maxCapacity'].setValue( room.aforoMax );
    this.roomForm.controls['domainState'].setValue( room.dominioEstado );
    this.roomForm.controls['floorId'].setValue( room.idPiso );
  }

  getRoomFormValue(): Room {
    return {
      nombre: this.roomForm.controls['name'].value,
      aforoMax: this.roomForm.controls['maxCapacity'].value,
      dominioEstado: this.roomForm.controls['domainState'].value,
      idPiso: this.roomForm.controls['floorId'].value,
    }
  }

  save(): void {
    if(this.isEditing){
      this.roomsService.updateRoom({
        ...this.getRoomFormValue(),
        idSala: this.room.idSala
      })
        .subscribe(
          (roomResponse: RoomResponse) => {
            this.router.navigateByUrl(RouteName.RoomsList);
            this.toastService.showToastSuccess({ summary: 'Sala actualizada', detail: 'La sala ha sido actualizada correctamente.' });
          },
          (() => this.room = new RoomClass())
        );
    }
    else{
      this.roomsService.createRoom(this.getRoomFormValue())
        .subscribe(
          (roomResponse: RoomResponse) => {
            this.router.navigateByUrl(RouteName.RoomsList);
            this.toastService.showToastSuccess({ summary: 'Sala creada', detail: 'La sala ha sido creada correctamente.' });
          },
          (() => this.room = new RoomClass())
        );
    }
  }

}
