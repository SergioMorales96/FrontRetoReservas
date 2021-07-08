import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Room, Floor, DominioEstado, RoomResponse, RoomClass } from '../../../interfaces/admin.interfaces';
import { RoomsService } from '../../../services/rooms.service';
import { RouteName } from '../../../../../utils/enums';

@Component({
  selector: 'app-form',
  templateUrl: './form-room.component.html',
  styles: [
  ]
})
export class FormRoomComponent implements OnInit {
  roomForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    maxCapacity: ['', [Validators.required]],
    domainState: ['', [Validators.required]],
    floorId: ['', [Validators.required]],
  });
  floors: Floor[] = [
    {
      idPiso: 1,
      aforoMaximo: 10,
      idSucursal: 1,     
      nombre: 'Piso 1',
      numeroPiso: 1
    },
    {
      idPiso: 2,
      aforoMaximo: 10,
      idSucursal: 1,     
      nombre: 'Piso 2',
      numeroPiso: 1
    }
  ];
  isEditing: boolean = false;
  room!: Room;

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
    private router: Router
  ) { }

  ngOnInit(): void {
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

  getRoom(id: Number): void{
    this.roomsService.getRoom(id)
      .subscribe(
        (roomResponse: RoomResponse) => {
          this.room = roomResponse.data;
          this.setRoom(this.room);
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
          (roomResponce: RoomResponse) => this.router.navigateByUrl(RouteName.RoomsList)
        );
    }
  }

}
