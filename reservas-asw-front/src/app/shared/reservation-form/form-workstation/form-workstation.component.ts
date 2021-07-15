import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-workstation',
  templateUrl: './form-workstation.component.html',
  styleUrls: ['./form-workstation.component.scss']
})
export class FormWorkstationComponent implements OnInit {

 
  @Input() formGroupName!: string;
  @Input() submitted!: boolean;
  AcompananteForm!: FormGroup;
  form!: FormGroup;
  numPiso!: number;
  numPersonas!: number;
  mediosTransporte: string[] = [];
  medioTransporte!: string;
  ind: number = 0;
  mostrarPlaca!: boolean;
  //esMiembro!: boolean;

  constructor(
    private rootFormGroup: FormGroupDirective,
    private fb: FormBuilder
  ) {
    this.mediosTransporte = ['Ninguno', 'Bicicleta', 'Carro', 'Moto'];
    
  }

  ngOnInit(): void {
    this.form = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
    //this.datosAcomp = this.form.get('datosAcompanante') as FormGroup;
    this.numPiso = this.form.get('piso')?.value;
    this.numPersonas = this.form.get('personasReserva')?.value;
    this.medioTransporte = this.form.get('medioTransporte')?.value;
    this.medioTransporte == 'Bicicleta' || this.medioTransporte == 'Ninguno'
      ? (this.mostrarPlaca = false) 
      : (this.mostrarPlaca = true);
  }

  get f() {
    return this.form.controls;
  }
  get datosAcompanante() {
    return this.form.controls['datosAcompanante'] as FormArray;
  }
  removeAcompanante() {
    this.datosAcompanante.removeAt(this.datosAcompanante.length - 1);
  }

  addAcompanante() {
    const AcompananteForm = this.fb.group({
      correo: [
        '',
        [Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')],
      ],
      miembroOrganizacion: [false, Validators.required],
    });
    this.datosAcompanante.push(AcompananteForm);
  }

  cambiarPiso(value: number): void {
    this.numPiso += value;
    this.form.controls['piso'].setValue(this.numPiso); //Otra forma
  }

  cambiarPersonas(value: number): void {
    this.numPersonas += value;
    this.form.patchValue({ personasReserva: this.numPersonas });
  }

  cambiarTransporte(value: number): void {
    this.ind += value;
    this.ind < 0 ? (this.ind = 3) : this.ind > 3 ? (this.ind = 0) : true;
    //console.log(this.ind);
    this.medioTransporte = this.mediosTransporte[this.ind];
    this.form.patchValue({ medioTransporte: this.medioTransporte });
    // Si es Bici o Moto, no hay placa
    if(this.medioTransporte == 'Bicicleta' || this.medioTransporte == 'Ninguno' ){
      this.mostrarPlaca = false;
      this.form.controls['placa'].setValue('');
    }else{
      this.mostrarPlaca = true;
    }
    }

}
