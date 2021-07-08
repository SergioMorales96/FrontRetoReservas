import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Floor, Sucursal } from '../../../interfaces/admin.interfaces';
import { FloorsService } from '../../../services/floors.service';

@Component({
  selector: 'app-floor-form',
  templateUrl: './form.floor.component.html',
  styles: [
  ]
})
export class FormFloorComponent implements OnInit {
  floorForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    aforoMaximo: ['', [Validators.required]],
    numeroPiso:['',[Validators.required]],
    idSucursal: ['', [Validators.required]],
    idPiso: [''],
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

  piso: Floor[]=[
    {
    idPiso: 6,
    aforoMaximo: 501,
    idSucursal: 1,
    nombre: "Piso pruebamodi",
    numeroPiso: 22,
  }
  ]
  
  isEditing: boolean = false;
  floor!: Floor;

  get formTitle(): string {
    return this.isEditing ? ( this.floor.nombre ?? 'Editar piso' ) : 'Crear piso';
  }

  get buttonLabel(): string {
    return this.isEditing ? 'Actualizar' : 'Crear';
  }
  constructor(
    private ActivatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private floorService: FloorsService,
    
  ) { }

  ngOnInit(): void {
      this.ActivatedRoute.params
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
          console.log(this.floor);
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

    console.log(this.floorForm.value);
    this.floorService.addNewFloor(this.floorForm.value).subscribe(
      (response: Floor)=>console.log(response)
    );
    console.log('save Floor', this.floorForm.value);
  }

}

