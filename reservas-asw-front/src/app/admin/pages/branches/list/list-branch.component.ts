import { Component, OnInit } from '@angular/core';
import { RouteName } from 'src/utils/enums';
import { Branch, BranchesResponse, BranchResponse } from '../../../interfaces/branches.interfaces';
import { BranchesService } from '../../../services/branches.service';
import { ToastsService } from '../../../../services/toasts.service';
import { AlertsService } from '../../../../services/alerts.service';

@Component({
  selector: 'app-list-branch',
  templateUrl: './list-branch.component.html',
  styleUrls: ['../../../adminList.scss']
})
export class ListBranchComponent implements OnInit {

  routeName = RouteName;
  branches: Branch[] = [];

  constructor(
    private branchesService: BranchesService,
    private toastService: ToastsService,
    private alertsService: AlertsService
  ) { }

  ngOnInit(): void {
    this.getBranches();
  }

  getBranches() {
    this.branchesService.getBranches()
      .subscribe(
        (branchesRespose: BranchesResponse) => this.branches = branchesRespose.data
      );
  }

  deleteBranch(id: number): void {
    this.alertsService.showConfirmDialog({
      message: '¿Desea eliminar la sucursal, esta acción no se podrá revertir?',
      header: 'Eliminar sucursal',
    })
      .then(resp => {
        if (resp) {
          this.branchesService.deleteBranch(id)
            .subscribe(
              (branchResponse: BranchResponse) => {
                this.branches = this.branches.filter((branch: Branch) => branch.idSucursal !== id);
                this.toastService.showToastSuccess({ summary: 'Sucursal eliminada', detail: 'La Sucursal ha sido eliminada correctamente.' });
              }
            );
        } else {
          return;
        }
      })
      .catch(console.log);
  }

}
