import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FloorsService } from '../../../services/floors.service';
import { RouteFloor } from '../../../../../utils/enums';
import { FloorResponse, FloorClass, Floor, FloorsResponse } from '../../../interfaces/floors.interfaces';
import { ToastsService } from '../../../../services/toasts.service';
import { Branch, BranchesResponse } from 'src/app/admin/interfaces/branches.interfaces';

@Component({
  selector: 'app-floor-form',
  templateUrl: './form.floor.component.html',
  styles: [
  ]
})
export class FormFloorComponent implements OnInit {

  floorForm = this.fb.group({
    nameFloor: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    maximunCapacity: ['', [Validators.required]],
    numberFloor: ['', [Validators.required]],
    idBranch: ['', [Validators.required]],
    nameBranch: [''],
    idFloor: [''],
  });
  isEditing: boolean = false;
  floor!: Floor;
  floor2: Floor[] = [];
  branches: Branch[] = [];
  routeName = RouteFloor;


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
          console.log( this.floor );
          this.setFloor(this.floor);
        }
      )
  }

  setFloor(floor: Floor): void {
    this.floorForm.controls['nameFloor'].setValue(floor.nombre);
    this.floorForm.controls['maximunCapacity'].setValue(floor.aforoMaximo);
    this.floorForm.controls['numberFloor'].setValue(floor.numeroPiso);
    this.floorForm.controls['nameBranch'].setValue(floor.nombreSucursal);
    this.floorForm.controls['idBranch'].setValue(floor.sucursalEntity?.idSucursal);
    this.floorForm.controls['idFloor'].setValue(floor.idPiso);
  }

  getFloorFormValue(): Floor {
    return {
      nombre: this.floorForm.controls['nameFloor'].value,
      aforoMaximo: this.floorForm.controls['maximunCapacity'].value,
      nombreSucursal: this.floorForm.controls['nameBranch'].value,
      numeroPiso: this.floorForm.controls['numberFloor'].value,
      idSucursal: this.floorForm.controls['idBranch'].value,
      idPiso: this.floorForm.controls['idFloor'].value,
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

