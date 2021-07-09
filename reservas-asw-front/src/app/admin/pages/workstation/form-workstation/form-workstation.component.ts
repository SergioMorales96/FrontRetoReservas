import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Workstation, WorkstationClass, WorkstationResponse} from 'src/app/admin/interfaces/admin.interfaces';
import { WorkstationsService } from 'src/app/admin/services/workstations.service';
import { RouteName } from '../../../../../utils/enums';
import { NombrePiso } from '../../../interfaces/admin.interfaces';

@Component({
  selector: 'app-form-workstation',
  templateUrl: './form-workstation.component.html',
  styles: [
  ]
})
export class FormWorkstationComponent implements OnInit {
  
  workstationForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    floorName: ['', [Validators.required]],
    domainTipe: ['', [Validators.required]],
    domainState: ['', [Validators.required]],
    floorId: ['', [Validators.required]],
  });
  
  isEditing: boolean = false;
  workstation!: Workstation;
  ///

  get formTitle(): string {
    return this.isEditing ? ( this.workstation?.nombre ?? 'Editar puesto de trabajo' ) : 'Crear puesto de trabajo';
  }

  get buttonLabel(): string {
    return this.isEditing ? 'Actualizar' : 'Crear';
  }


  constructor( 
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private workstationsService: WorkstationsService,
    private router: Router,
    ) { }

  ngOnInit(): void {

    this.activatedRoute.params
    .subscribe(({ id }) => {
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

setWorkstation( workstation: Workstation ): void {
  this.workstationForm.controls['name'].setValue( workstation.nombre );
  this.workstationForm.controls['floorName'].setValue( workstation.nombrePiso );
  this.workstationForm.controls['domainState'].setValue( workstation.dominioEstado );
  this.workstationForm.controls['floorId'].setValue( workstation.idPiso );
  this.workstationForm.controls['domainTipe'].setValue( workstation.dominioTipo );

}

getWorkstationFormValue(): Workstation {
  return {    
    nombre: this.workstationForm.controls['name'].value,
    dominioEstado: this.workstationForm.controls['domainState'].value,
    nombrePiso: this.workstationForm.controls['floorName'].value,
    dominioTipo: this.workstationForm.controls['domainTipe'].value,
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
        (workstationResponse: WorkstationResponse) => this.router.navigateByUrl(RouteName.WorkstationList)
      );
  } else {
    this.workstationsService.createWorkstation(this.getWorkstationFormValue())
      .subscribe(
        (workstationResponse: WorkstationResponse) => this.router.navigateByUrl(RouteName.WorkstationList)
      );
  }
}
  
}

