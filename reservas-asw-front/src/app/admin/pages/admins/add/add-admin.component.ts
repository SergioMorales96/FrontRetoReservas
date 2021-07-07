import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Administrador, Branch } from '../../../interfaces/admin.interfaces';
@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styles: [
  ]
})

export class AddAdminComponent implements OnInit {
  adminForm = this.fb.group({
    email: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    sucursalId: ['', [Validators.required]],


  });

  branches: Branch[] = [
    {
      idSucursal: 1,
      nombre: 'TORRE SIGMA',
      direccion: 'BOGOTA',
      nit: '900001',
      aforoMaximo: 300,
    }
  ];

  isEditing: boolean = false;
  admin!: Administrador;

  get formTitle(): string {
    return this.isEditing ? (this.admin.email ?? 'Editar admin') : 'Crear administrador';
  }

  get buttonLabel(): string {
    return this.isEditing ? 'Actualizar' : 'Crear';
  }
  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(({ id }) => {
        if ( id ) {
          this.isEditing = true;
          console.log( 'admin id', id );

          this.admin = {
            idAdministrador: 1,
            email:          "spinillia@asesoftware.com",
            idSucursal:      1,
            nombreSucursal: "TORRE SIGMA"
          }

          this.setAdmin( this.admin );
        }
      });



}

setAdmin( admin: Administrador ): void {
  this.adminForm.controls['email'].setValue( admin.email );
  this.adminForm.controls['sucursalId'].setValue( admin.idSucursal );
}



saveAdmin(): void {
  console.log('save admin', this.adminForm.value);
}

}
