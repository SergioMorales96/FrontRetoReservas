import { Component, OnInit } from '@angular/core';
import { AdminsService } from 'src/app/admin/services/admins.service';
import { Administrador, AdminsResponse, AdminResponse } from '../../../interfaces/admin.interfaces';
import { RouteName } from '../../../../../utils/enums';

@Component({
  selector: 'app-list-admin',
  templateUrl: './list-admin.component.html',
  styles: [
  ]
})
export class ListAdminComponent implements OnInit {

  routeName = RouteName;
  admins: Administrador[] = [];

  constructor(
    private adminsService: AdminsService
  ) { }
  
  ngOnInit(): void {
    this.getAdmins();
  }
  
  getAdmins(){
    this.adminsService.getAdmins()
    .subscribe(
      (adminsResponse: AdminsResponse) => this.admins = adminsResponse.data
    );
  }

  get results(): Administrador[] {
    return this.adminsService.admin;
  }

  selectedAdmin!: Administrador;

  deleteAdmin(id: number): void {
    this.adminsService.deleteAdmin(id)
    .subscribe(
      (adminResponse:AdminResponse) => this.admins = this.admins.filter((admin:Administrador)=> admin.idAdministrador !== id)
    );
    console.log(id);
  };
}
