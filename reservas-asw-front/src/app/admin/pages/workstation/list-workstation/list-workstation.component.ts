import { Component, OnInit } from '@angular/core';
import { RouteName } from '../../../../../utils/enums';
import { Workstation, WorkstationResponse, WorkstationsResponse } from '../../../interfaces/workstation.interfaces';
import { WorkstationsService } from '../../../services/workstations.service';

@Component({
  selector: 'app-list-workstation',
  templateUrl: './list-workstation.component.html',
  styleUrls: ['./list-workstation.component.scss']
})
export class ListWorkstationComponent implements OnInit{

  routeName = RouteName;
  workstations: Workstation[] = [];

  constructor(
      private workstationsService: WorkstationsService
  ) { }

  ngOnInit(): void{
      this.getWorkstations();  
  }

  getWorkstations(){
    this.workstationsService.getWorkstations()
    .subscribe(
        (workstationsResponse: WorkstationsResponse) => this.workstations = workstationsResponse.data
    );
  }
  deleteWorkstation( id: number ): void {
    this.workstationsService.deleteWorkstation(id)
    .subscribe(
        (workstationResponse: WorkstationResponse) => this.workstations = this.workstations.filter((workstation: Workstation) => workstation.idPuestoTrabajo !== id )
    );
  }

}
