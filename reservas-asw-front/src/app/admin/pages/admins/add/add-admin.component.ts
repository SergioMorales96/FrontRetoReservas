import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Administrador, AdminResponse, Branch, AdminClass } from '../../../interfaces/admin.interfaces';
import { AdminsService } from '../../../services/admins.service';
import { RouteName } from '../../../../../utils/enums';
@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styles: [
  ]
})

export class AddAdminComponent implements OnInit {
  adminForm = this.fb.group({
    email: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100), Validators.email]],
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
    return this.isEditing ? (this.admin?.email ?? 'Editar administrador') : 'Crear administrador';
  }

  get buttonLabel(): string {
    return this.isEditing ? 'Actualizar' : 'Crear';
  }
  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private adminsService: AdminsService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(({ id }) => {
        if ( id ) {
         this.isEditing =true;
         this.getAdmin(id);
        }else{
        this.admin = new AdminClass();
        }
      });
}

getAdmin(id : number): void{
  this.adminsService.getAdmin(id)
    .subscribe(
      (adminResponse:AdminResponse) => {
        this.admin = adminResponse.data;
        this.setAdmin(this.admin);
      }
    )
}

setAdmin( admin: Administrador ): void {
  this.adminForm.controls['email'].setValue( admin.email );
  this.adminForm.controls['sucursalId'].setValue( admin.idSucursal );
}

getAdminFormValue():Administrador {
  return {
    email:  this.adminForm.controls['email'].value,        
    idSucursal:   this.adminForm.controls['sucursalId'].value
  }


}
save(): void {
  if (this.isEditing) {
    this.adminsService.updateAdmin({
      ...this.getAdminFormValue(),
      idAdministrador: this.admin.idAdministrador
    })
    .subscribe(
      (adminResponse : AdminResponse) => this.router.navigateByUrl(RouteName.AdminsList)
    );
  } else {
    this.adminsService.createAdmin(this.getAdminFormValue())
    .subscribe(
      (adminResponse : AdminResponse) => this.router.navigateByUrl(RouteName.AdminsList)
    );
  }
}

}
