import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DominioEstado, DominioTipo, Floor, NombrePiso, Workstation} from 'src/app/admin/interfaces/admin.interfaces';

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
  floors: Floor[] = [
    {
      idPiso: 1,
      aforoMaximo: 10,
      idSucursal: 1,     
      nombre: 'Piso 1',
      numeroPiso: 1
    },
    {
      idPiso: 2,
      aforoMaximo: 10,
      idSucursal: 1,     
      nombre: 'Piso 2',
      numeroPiso: 1
    }
  ];
  isEditing: boolean = false;
  workstation!: Workstation;

  get formTitle(): string {
    return this.isEditing ? ( this.workstation.nombre ?? 'Editar puesto de trabajo' ) : 'Crear puesto de trabajo';
  }

  get buttonLabel(): string {
    return this.isEditing ? 'Actualizar' : 'Crear';
  }


  constructor( private activatedRoute: ActivatedRoute,
    private fb: FormBuilder) { }

  ngOnInit(): void {

    this.activatedRoute.params
    .subscribe(({ id }) => {
      if ( id ) {
        this.isEditing = true;
        console.log( 'puesto id', id );

        this.workstation = {
          idPuestoTrabajo: 1,
          dominioEstado: DominioEstado.A,
          dominioTipo: DominioTipo.G,
          idPiso: 1,
          nombre: "SALA 1",
          nombrePiso: NombrePiso.Piso18,
        }

        this.setWorkstation( this.workstation );
      }
    });
}

setWorkstation( workstation: Workstation ): void {
  this.workstationForm.controls['name'].setValue( workstation.nombre );
  this.workstationForm.controls['floorName'].setValue( workstation.nombrePiso );
  this.workstationForm.controls['domainState'].setValue( workstation.dominioEstado );
  this.workstationForm.controls['floorId'].setValue( workstation.idPiso );
  this.workstationForm.controls['domainTipe'].setValue( workstation.dominioTipo );

}

saveWorkstation(): void {
  console.log('save Workstation', this.workstationForm.value);
}

  

}
