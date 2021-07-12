import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Workstation, WorkstationClass, WorkstationResponse } from 'src/app/admin/interfaces/workstation.interfaces';
import { WorkstationsService } from 'src/app/admin/services/workstations.service';
import { RouteName, WorkStationState } from '../../../../../utils/enums';
import { ToastsService } from 'src/app/services/toasts.service';
import { DomainsService } from 'src/app/admin/services/domains.service';
import { Domain, DomainsResponse } from 'src/app/admin/interfaces/domains.interfaces';
import { Floor } from 'src/app/admin/interfaces/floors.interfaces';
import { FloorsService } from 'src/app/admin/services/floors.service';
import { FloorsResponse } from 'src/app/admin/interfaces/floors.interfaces';


@Component({
  selector: 'app-form-workstation',
  templateUrl: './form-workstation.component.html',
  styles: [
  ]
})
export class FormWorkstationComponent implements OnInit {

  workstationForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    domainType: ['', [Validators.required]],
    domainState: ['', [Validators.required]],
    floorId: ['', [Validators.required]],
  });

  isEditing: boolean = false;
  workstation!: Workstation;
  domains: Domain[] = [];
  floors: Floor[] = [];
  routeName = RouteName;
  workstationStates = [
    {
      label: 'Activo',
      value: WorkStationState.Active,
    },
    {
      label: 'Inactivo',
      value: WorkStationState.Inactive,
    }
  ];

  get formTitle(): string {
    return this.isEditing ? (this.workstation?.nombre ?? 'Editar puesto de trabajo') : 'Crear puesto de trabajo';
  }

  get buttonLabel(): string {
    return this.isEditing ? 'Actualizar' : 'Crear';
  }


  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private workstationsService: WorkstationsService,
    private router: Router,
    private toastService: ToastsService,
    private domainsService: DomainsService,
    private foorService: FloorsService,
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params
      .subscribe(({ id }) => {
        this.getDomains();
        this.getFloors();
        if (id) {
          this.isEditing = true;
          this.getWorkstation(id);
        } else {
          this.workstation = new WorkstationClass();
        }
      });
  }

  getWorkstation(id: number): void {
    this.workstationsService.getWorkstation(id)
      .subscribe(
        (workstationResponse: WorkstationResponse) => {
          this.workstation = workstationResponse.data;
          this.setWorkstation(this.workstation);
        }
      )
  }

  getDomains(): void {
    this.domainsService.getDomains()
      .subscribe(
        (domainsResponse: DomainsResponse) => this.domains = domainsResponse.data
      );
  }
  getFloors(): void {
    this.foorService.getFloors()
      .subscribe(
        (floorsResponse: FloorsResponse) => this.floors = floorsResponse.data
      );
  }

  setWorkstation(workstation: Workstation): void {
    this.workstationForm.controls['name'].setValue(workstation.nombre);
    this.workstationForm.controls['domainState'].setValue(workstation.dominioEstado);
    this.workstationForm.controls['floorId'].setValue(workstation.idPiso);
    this.workstationForm.controls['domainType'].setValue(workstation.dominioTipo);

  }

  getWorkstationFormValue(): Workstation {
    return {
      nombre: this.workstationForm.controls['name'].value,
      dominioEstado: this.workstationForm.controls['domainState'].value,
      dominioTipo: this.workstationForm.controls['domainType'].value,
      idPiso: this.workstationForm.controls['floorId'].value,
    }
  }

  saveWorkstation(): void {

    if (this.isEditing) {
      this.workstationsService.updateWorkstation({
        ...this.getWorkstationFormValue(),
        idPuestoTrabajo: this.workstation.idPuestoTrabajo
      })
        .subscribe(
          (workstationResponse: WorkstationResponse) => {
            this.router.navigateByUrl(RouteName.WorkstationList);
            this.toastService.showToastSuccess({ summary: 'Puesto de trabajo actualizado', detail: 'El puesto de trabajo ha sido actualizado correctamente.' });

          }

        );
    } else {
      this.workstationsService.createWorkstation(this.getWorkstationFormValue())
        .subscribe(
          (workstationResponse: WorkstationResponse) => {
            this.router.navigateByUrl(RouteName.WorkstationList);
            this.toastService.showToastSuccess({ summary: 'Puesto de trabajo creado', detail: 'El puesto de trabajo ha sido creado correctamente.' });
          }
        );
    }
  }

}

