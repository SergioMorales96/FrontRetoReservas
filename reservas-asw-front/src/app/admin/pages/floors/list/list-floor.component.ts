import { Component, OnInit } from '@angular/core';
import { Floor, FloorsResponse, FloorResponse } from '../../../interfaces/floor.interfaces';
import { FloorsService } from '../../../services/floors.service';
import { RouteFloor } from '../../../../../utils/enums';
import { ToastsService } from '../../../../services/toasts.service';
import { AlertsService } from '../../../../services/alerts.service';

@Component({
  selector: 'app-list-floor',
  templateUrl: './list-floor.component.html',
  styleUrls: ['./list-floor.component.scss']
})
export class ListfloorComponent implements OnInit {
  routeFloor = RouteFloor;
  floors: Floor[] = [];

  constructor(
    private floorsService: FloorsService,
    private toastService: ToastsService,
    private alertsService: AlertsService
  ) { }

  ngOnInit(): void {
    this.getFloors();
  }
  getFloors() {
    this.floorsService.getFloors()
      .subscribe(
        (floorsResponse: FloorsResponse) => this.floors = floorsResponse.data);
  }

  deleteFloor(id: number): void {
    this.alertsService.showConfirmDialog({
          message: '¿Desea eliminar el piso, esta acción no se podrá revertir?',
          header: 'Eliminar piso',
        })
        .then(resp => {
        if (resp) {
         this.floorsService.deleteFloor(id)
          .subscribe(
             (floorResponse: FloorResponse) => {
               this.floors = this.floors.filter((floor: Floor) => floor.idPiso !== id);
               this.toastService.showToastSuccess({ summary: 'Piso Eliminado', detail: 'El piso ha sido eliminado correctamente'});
          }
       );
   }else {
   return;
  }
 })
    .catch(console.log);
 }
}
