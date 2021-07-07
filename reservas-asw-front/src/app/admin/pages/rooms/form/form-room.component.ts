import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Room, Floor, DominioEstado } from '../../../interfaces/admin.interfaces';

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
    return this.isEditing ? ( this.room.nombre ?? 'Editar sala' ) : 'Crear sala';
  }

  get buttonLabel(): string {
    return this.isEditing ? 'Actualizar' : 'Crear';
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(({ id }) => {
        if ( id ) {
          this.isEditing = true;
          console.log( 'floor id', id );

          this.room = {
            idSala: 1,
            aforoMax: 6,
            dominioEstado: DominioEstado.A,
            idPiso: 1,
            nombre: "SALA 1"
          }

          this.setRoom( this.room );
        }
      });
  }

  setRoom( room: Room ): void {
    this.roomForm.controls['name'].setValue( room.nombre );
    this.roomForm.controls['maxCapacity'].setValue( room.aforoMax );
    this.roomForm.controls['domainState'].setValue( room.dominioEstado );
    this.roomForm.controls['floorId'].setValue( room.idPiso );
  }

  saveRoom(): void {
    console.log('save room', this.roomForm.value);
  }

}
