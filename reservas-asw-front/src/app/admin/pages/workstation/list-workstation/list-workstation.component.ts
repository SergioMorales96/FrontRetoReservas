import { Component, OnInit } from '@angular/core';
import { AlertsService } from 'src/app/services/alerts.service';
import { ToastsService } from 'src/app/services/toasts.service';
import { RouteName } from '../../../../../utils/enums';
import { Workstation, WorkstationResponse, WorkstationsResponse } from '../../../interfaces/workstation.interfaces';
import { WorkstationsService } from '../../../services/workstations.service';

@Component({
  selector: 'app-list-workstation',
  templateUrl: './list-workstation.component.html',
  styleUrls: ['./list-workstation.component.scss']
})
export class ListWorkstationComponent implements OnInit {

  routeName = RouteName;
  workstations: Workstation[] = [];

  constructor(
    private workstationsService: WorkstationsService,
    private toastService: ToastsService,
    private alertsService: AlertsService
  ) { }

  ngOnInit(): void {
    this.getWorkstations();
  }

  getWorkstations() {
    this.workstationsService.getWorkstations()
      .subscribe(
        (workstationsResponse: WorkstationsResponse) => this.workstations = workstationsResponse.data
      );
  }
  deleteWorkstation(id: number): void {
    this.alertsService.showConfirmDialog({
      message: '¿Desea eliminar el puesto de trabajo, esta acción no se podrá revertir?',
      header: 'Eliminar puesto de trabajo',
    })
    .then(resp =>{
      if(resp){
        this.workstationsService.deleteWorkstation(id)
        .subscribe(
          (workstationResponse: WorkstationResponse) => {
            this.workstations = this.workstations.filter((workstation: Workstation) => workstation.idPuestoTrabajo !== id);
            this.toastService.showToastSuccess({ summary: 'Dominio eliminado', detail: 'El dominio ha sido eliminado correctamente.' });
          }
        );

      } else {
        return;
      }
    })
    .catch(console.log);



    
      
  }

}
