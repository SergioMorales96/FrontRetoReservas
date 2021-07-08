import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Branch } from 'src/app/admin/interfaces/admin.interfaces';
import { BranchesService } from '../../../services/branches.service';

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
    return this.isEditing ? ( this.branch.nombre ?? 'Editar sucursal' ) : 'Crear sucursal';
  }

  get buttonLabel(): string {
    return this.isEditing ? 'Actualizar' : 'Crear';
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private api: BranchesService

  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(({ id }) => {
        if ( id ) {
          this.isEditing = true;
          console.log( 'branch id', id );

          this.branch = {
            idSucursal: 1,
            aforoMaximo: 23,
            nit:"1234",
            direccion: "123",
            nombre: "ASESOFTWARE",
            nombreEmpresa: "ASESOFTWARE",
          }

          this.setBranch( this.branch );
        }
      });
  }

  setBranch( branch: Branch ): void {
    this.branchForm.controls['name'].setValue( branch.nombre );
    this.branchForm.controls['maxCapacity'].setValue( branch.aforoMaximo );
    this.branchForm.controls['direccion'].setValue( branch.direccion);
    this.branchForm.controls['nit'].setValue( branch.nit);
  }

  saveBranch(): void {
    console.log('save branch', this.branchForm.value);
  }

  crearSucursal(){
    const body = {
      aforoMaximo: this.branchForm.controls['maxCapacity'].value,
      direccion: this.branchForm.controls['direccion'].value,
      nit: this.branchForm.controls['nit'].value,
      nombre: this.branchForm.controls['name'].value,
  }
    this.api.crearSucursal(body).subscribe((respuesta)=>{
      console.log("respuestaaaaaaaaaaaaaaa",respuesta);
    })
  }

}