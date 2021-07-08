import { Component, OnInit } from '@angular/core';
import { AdminsService } from 'src/app/admin/services/admins.service';
import { Administrador } from '../../../interfaces/admin.interfaces';
import { RouteName } from '../../../../../utils/enums';

@Component({
  selector: 'app-list-admin',
  templateUrl: './list-admin.component.html',
  styles: [
  ]
})
export class ListAdminComponent implements OnInit {

  ngOnInit(): void {
    this.adminService.getAdmins();
  }

  routeName = RouteName;
  admins: Administrador[] = [];

  constructor(
    private adminService: AdminsService
  ) { }


  get results(): Administrador[] {
    return this.adminService.result;
  }

  selectedAdmin!: Administrador;

  deleteAdmin(idAdministrador: number): void {
    console.log(idAdministrador);
  };
}
