import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Workstation, WorkstationResponse } from 'src/app/admin/interfaces/workstation.interfaces';
import { WorkstationsService } from '../../../services/workstations.service';
import { RouteName } from '../../../../../utils/enums';

@Component({
  selector: 'app-view-workstation',
  templateUrl: './view-workstation.component.html',
  styles: [
  ]
})
export class ViewWorkstationComponent implements OnInit {

  workstation!: Workstation;
  routeName = RouteName;

  get viewTitle(): string {
    return this.workstation?.nombre ? this.workstation.nombre : 'Ver puesto de trabajo';
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private workstationsService: WorkstationsService) { }

  ngOnInit(): void {

    this.activatedRoute.params
      .subscribe(({ id }) => {
        if (id) {

          this.getWorkstation(id);

        }
      });
  }

  getWorkstation(id: number): void {
    this.workstationsService.getWorkstation(id)
      .subscribe(
        (workstationResponse: WorkstationResponse) => this.workstation = workstationResponse.data
      );
  }

}
