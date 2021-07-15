import { Component, OnInit } from '@angular/core';
import { AdminsService } from 'src/app/admin/services/admins.service';
import { Administrador, AdminsResponse, AdminResponse } from '../../../interfaces/admins.interfaces';
import { RouteName } from '../../../../../utils/enums';
import { ToastsService } from '../../../../services/toasts.service';
import { AlertsService } from '../../../../services/alerts.service';

@Component({
  selector: 'app-list-admin',
  templateUrl: './list-admin.component.html',
  styleUrls: ['./list-admin.component.scss']
})
export class ListAdminComponent implements OnInit {

  routeName = RouteName;
  admins: Administrador[] = [];

  constructor(
    private adminsService: AdminsService,
    private toastService: ToastsService,
    private alertService: AlertsService
  ) { }

  ngOnInit(): void {
    this.getAdmins();
  }

  getAdmins() {
    this.adminsService.getAdmins()
      .subscribe(
        (adminsResponse: AdminsResponse) => this.admins = adminsResponse.data
      );
  }

  get results(): Administrador[] {
    return this.adminsService.admin;
  }

  deleteAdmin(id: number): void {
    this.alertService.showConfirmDialog({
      message: '¿Desea eliminar el administrador? esta acción no se podrá revertir',
      header: 'Eliminar Administrador',
    })
      .then(resp => {
        if (resp) {
          this.adminsService.deleteAdmin(id)
            .subscribe(
              (adminResponse: AdminResponse) => {
                this.admins = this.admins.filter((admin: Administrador) => admin.idAdministrador !== id);
                this.toastService.showToastSuccess({ summary: 'Administrador Eliminado', detail: 'El administrador ha sido eliminado correctamente' });
              });
          console.log(id);
        } else {
          return;
        }
      })
      .catch(console.log);
  }
}
