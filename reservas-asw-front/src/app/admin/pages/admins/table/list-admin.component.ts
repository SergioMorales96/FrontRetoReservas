import { Component, OnInit } from '@angular/core';
import { AdminsService } from 'src/app/admin/services/admins.service';
import { Administrador } from '../../../interfaces/admin.interfaces';

@Component({
  selector: 'app-list-admin',
  templateUrl: './list-admin.component.html',
  styles: [
  ]
})
export class ListAdminComponent implements OnInit {
  admins: Administrador[] = [];

  term: string = '';

  constructor(
    private adminService: AdminsService
  ) { }
  ngOnInit(): void {
    this.adminService.getAdmins();
  }

  get results():Administrador[] {
    return this.adminService.result;
  }

  selectedAdmin!: Administrador;

  deleteAdmin(idAdministrador: number): void {
    console.log(idAdministrador);
  };
}
