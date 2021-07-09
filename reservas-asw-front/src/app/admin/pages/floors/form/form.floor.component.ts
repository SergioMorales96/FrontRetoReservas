import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Floor, Sucursal, FloorClass, FloorResponse, FloorsResponse } from '../../../interfaces/admin.interfaces';
import { FloorsService } from '../../../services/floors.service';
import { RouteFloor } from '../../../../../utils/enums';

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
    nombreSucursal: ['', [Validators.required]],
    idPiso: [''],
  });
  isEditing: boolean = false;
  floor!: Floor;
  
  // sucursal: Sucursal[] = [
  //   {
  //     idSucursal: 1,
  //     aforoMaximo: 300,
  //     direccion: "BOGOTA",
  //     nit: "9000001",
  //     nombre: "TORRE SIGMA",
  //     nombreEmpresa: "ASESOFTWARE"

  //   }
  // ]

  get formTitle(): string {
    return this.isEditing ? ( this.floor?.nombre ?? 'Editar piso' ) : 'Crear piso';
  }

  get buttonLabel(): string {
    return this.isEditing ? 'Actualizar' : 'Crear';
  }
  constructor(
    private ActivatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private floorsService: FloorsService,
    private router: Router  
    ) {
      
     }

  ngOnInit(): void {
      this.ActivatedRoute.params
      .subscribe(({ id }) => {
        if ( id ) {
          this.isEditing = true;
           this.getFloor(id);
        } else {
          this.floor = new FloorClass();
        }
      });
    }   
        getFloor(id: number): void {
          this.floorsService.getFloor(id)
            .subscribe(
              (floorResponse: FloorResponse) => {
                this.floor = floorResponse.data;
                //  this.setFloor(this.floor);
              }
            )
        }

      // setFloor( floor: Floor ): void {
      //   this.floorForm.controls['name'].setValue(floor.nombre);
      //   this.floorForm.controls['floorId'].setValue(floor.idPiso);
      //    this.floorForm.controls['numberFloor'].setValue(floor.numeroPiso);
      //    this.floorForm.controls['maxCapacity'].setValue(floor.aforoMaximo);
      //    this.floorForm.controls['nameBranch'].setValue(floor.nombreSucursal);
      //    this.floorForm.controls['branchId'].setValue(floor.idSucursal);
      
      //   }

    getFloorFormValue(): Floor {
      return {
        nombreSucursal: this.floorForm.controls['nameBranch'].value,
        aforoMaximo: this.floorForm.controls['maxCapacity'].value,
        numeroPiso: this.floorForm.controls['numberFloor'].value,
        idSucursal: this.floorForm.controls['branchId'].value,
        idPiso: this.floorForm.controls['floorId'].value,
        nombre: this.floorForm.controls['name'].value,
      }
    }

  save(): void {
    if (this.isEditing) {
      this.floorsService.updateFloor({
        ...this.getFloorFormValue(),
        idPiso: this.floor.idPiso
      })
      .subscribe(
        (floorResponse: FloorResponse) => this.router.navigateByUrl(RouteFloor.FloorList)
      );
    } else {
      this.floorsService.createFloor(this.getFloorFormValue())
      .subscribe(
        (floorResponse: FloorResponse) => this.router.navigateByUrl(RouteFloor.FloorList)
      );
    }
  }
}

