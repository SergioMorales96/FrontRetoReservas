import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Floor, Sucursal } from '../../../interfaces/admin.interfaces';

@Component({
  selector: 'app-floor-form',
  templateUrl: './form.floor.component.html',
  styles: [
  ]
})
export class AddFloorComponent implements OnInit {
  floorForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    maxCapacity: ['', [Validators.required]],
    numberFloor:['',[Validators.required]],
    branchId: ['', [Validators.required]],
    floorId: ['', [Validators.required]],
  });
  sucursal: Sucursal[] = [
    {
      idSucursal: 1,
      aforoMaximo: 300,
      direccion: "BOGOTA",
      nit: "9000001",
      nombre: "TORRE SIGMA",
      nombreEmpresa: "ASESOFTWARE"
    }
  ];


  isEditing: boolean = false;
  floor!: Floor;

  get formTitle(): string {
    return this.isEditing ? ( this.floor.nombre ?? 'Editar sala' ) : 'Crear sala';
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

          this.floor = {
            idPiso:      1,
            aforoMaximo: 700,
            idSucursal:  1,
            nombre: "prueba",
            numeroPiso: 21,
            
          }
          this.setFloor(this.floor);
        }
      });
  }

  setFloor( floor: Floor ): void {
    this.floorForm.controls['maxCapacity'].setValue(floor.aforoMaximo);
    this.floorForm.controls['numberFloor'].setValue(floor.numeroPiso);
    this.floorForm.controls['branchId'].setValue(floor.idSucursal);
    this.floorForm.controls['floorId'].setValue(floor.idPiso);
    this.floorForm.controls['name'].setValue(floor.nombre);
  }

  saveFloor(): void {
    console.log('save Floor', this.floorForm.value);
  }

}
