import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Branch, BranchClass, BranchResponse } from 'src/app/admin/interfaces/branches.interfaces';
import { BranchesService } from '../../../services/branches.service';
import { RouteName } from '../../../../../utils/enums';
import { ToastsService } from '../../../../services/toasts.service';

@Component({
  selector: 'app-form-branch',
  templateUrl: './form-branch.component.html',
  styles: [
  ]
})
export class FormBranchComponent implements OnInit {

  branchForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    maxCapacity: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
    nit: ['', [Validators.required]],
  });

  isEditing: boolean = false;
  branch!: Branch;

  get formTitle(): string {
    return this.isEditing ? (this.branch?.nombre ?? 'Editar sucursal') : 'Crear sucursal';
  }

  get buttonLabel(): string {
    return this.isEditing ? 'Actualizar' : 'Crear';
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private branchesService: BranchesService,
    private router: Router,
    private toastService: ToastsService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(({ id }) => {
        if (id) {
          this.isEditing = true;
          this.getBranch(id);
        } else {
          this.branch = new BranchClass();
        }
      });
  }

  getBranch(id: number): void {
    this.branchesService.getBranch(id)
      .subscribe(
        (branchResponse: BranchResponse) => {
          this.branch = branchResponse.data;
          this.setBranch(this.branch);
        }
      )
  }

  setBranch(branch: Branch): void {
    this.branchForm.controls['name'].setValue(branch.nombre);
    this.branchForm.controls['maxCapacity'].setValue(branch.aforoMaximo);
    this.branchForm.controls['direccion'].setValue(branch.direccion);
    this.branchForm.controls['nit'].setValue(branch.nit);
  }

  getBranchFormValue(): Branch {
    return {
      aforoMaximo: this.branchForm.controls['maxCapacity'].value,
      direccion: this.branchForm.controls['direccion'].value,
      nit: this.branchForm.controls['nit'].value,
      nombre: this.branchForm.controls['name'].value,
    }
  }

  save(): void {
    if (this.isEditing) {
      this.branchesService.updateBranch({
        ...this.getBranchFormValue(),
        idSucursal: this.branch.idSucursal
      })
        .subscribe(
          (branchResponse: BranchResponse) => {
            this.router.navigateByUrl(RouteName.BranchesList);
            this.toastService.showToastSuccess({ summary: 'Sucursal actualizada', detail: 'La Sucursal ha sido actualizada correctamente.' });
          },
          (() => this.branch = new BranchClass())
        );
    } else {
      this.branchesService.createBranch(this.getBranchFormValue())
        .subscribe(
          (branchResponse: BranchResponse) => {
            this.router.navigateByUrl(RouteName.BranchesList);
            this.toastService.showToastSuccess({ summary: 'Sucursal creado', detail: 'La Sucursal ha sido creado correctamente.' });
          },
          (() => this.branch = new BranchClass())
        );
    }
  }
}
