import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FloorsService } from '../../../services/floors.service';
import { Floor } from 'src/app/admin/interfaces/floor.interfaces';
import { FloorClass, FloorResponse, FloorsResponse } from '../../../interfaces/floor.interfaces';
import { RouteFloor } from '../../../../../utils/enums';
import { ToastsService } from '../../../../services/toasts.service';
import { Branch, BranchesResponse } from '../../../interfaces/branches,interfaces';

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
    numeroPiso: ['', [Validators.required]],
    idSucursal: ['', [Validators.required]],
    nombreSucursal: [''],
    idPiso: [''],
  });
  isEditing: boolean = false;
  floor!: Floor;
  floor2: Floor[] = [];
  branches: Branch[] = [];


  get formTitle(): string {
    return this.isEditing ? (this.floor?.nombre ?? 'Editar piso') : 'Crear piso';
  }

  get buttonLabel(): string {
    return this.isEditing ? 'Actualizar' : 'Crear';
  }
  constructor(
    private ActivatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private floorsService: FloorsService,
    private router: Router,
    private toastService: ToastsService
  ) {
    this.getBranches();
    this.getFloors();
  }

  ngOnInit(): void {
    this.ActivatedRoute.params
      .subscribe(({ id }) => {
        if (id) {
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
          this.setFloor(this.floor);
        }
      )
  }

  setFloor(floor: Floor): void {
    this.floorForm.controls['nombre'].setValue(floor.nombre);
    this.floorForm.controls['aforoMaximo'].setValue(floor.aforoMaximo);
    this.floorForm.controls['numeroPiso'].setValue(floor.numeroPiso);
    this.floorForm.controls['nombreSucursal'].setValue(floor.nombreSucursal);
    this.floorForm.controls['idSucursal'].setValue(floor.idSucursal);
    this.floorForm.controls['idPiso'].setValue(floor.idPiso);
  }

  getFloorFormValue(): Floor {
    return {
      nombreSucursal: this.floorForm.controls['nombreSucursal'].value,
      aforoMaximo: this.floorForm.controls['aforoMaximo'].value,
      numeroPiso: this.floorForm.controls['numeroPiso'].value,
      idSucursal: this.floorForm.controls['idSucursal'].value,
      idPiso: this.floorForm.controls['idPiso'].value,
      nombre: this.floorForm.controls['nombre'].value,
    }
  }

  save(): void {
    console.log('save Floor', this.floorForm.value);
    if (this.isEditing) {
      this.floorsService.updateFloor({
        ...this.getFloorFormValue(),
        idPiso: this.floor.idPiso
      })
        .subscribe(
          (floorResponse: FloorResponse) => {
            this.router.navigateByUrl(RouteFloor.FloorList);
            this.toastService.showToastSuccess({ summary: 'Piso actualizado', detail: 'El piso ha sido actualizado correctamente.' });
         },
         (() => this.floor = new FloorClass())
        );

    } else {
      this.floorsService.createFloor(this.getFloorFormValue())
        .subscribe(
          (floorResponse: FloorResponse) => {
            this.router.navigateByUrl(RouteFloor.FloorList);
            this.toastService.showToastSuccess({ summary: 'Piso creado', detail: 'El piso ha sido creado correctamente.' });
          },
          (() => this.floor = new FloorClass())
        )

    }
  }
  getBranches() {
    this.floorsService.getBranches()
      .subscribe(
        (branchesRespose: BranchesResponse) => this.branches = branchesRespose.data
      );
  }
  getFloors() {
    this.floorsService.getFloors()
      .subscribe(
        (floorsResponse: FloorsResponse) => this.floor2 = floorsResponse.data)
  }

}

