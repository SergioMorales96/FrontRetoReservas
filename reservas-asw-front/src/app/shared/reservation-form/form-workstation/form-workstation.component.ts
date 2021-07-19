import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormGroupDirective,
  FormBuilder,
  FormArray,
  Validators,
} from '@angular/forms';
import { SharedService } from '../../services/shared.service';
import { DateValidationType } from '../../../../utils/enums';

@Component({
  selector: 'app-form-workstation',
  templateUrl: './form-workstation.component.html',
  styleUrls: ['./form-workstation.component.scss'],
})
export class FormWorkstationComponent implements OnInit {
  @Input() formGroupName!: string;
  @Input() submitted!: boolean;
  AcompananteForm!: FormGroup;
  form!: FormGroup;
  numPiso!: number;
  numPersonas!: number;
  mediosTransporte: { label: string; value: any }[] = [];
  medioTransporte!: number | null;
  ind: number = 0;
  mostrarPlaca!: boolean;

  //esMiembro!: boolean;

  constructor(
    private rootFormGroup: FormGroupDirective,
    private fb: FormBuilder,
    private sharedService: SharedService
  ) {
    //this.mediosTransporte = ['Ninguno', 'Bicicleta', 'Carro', 'Moto'];
    this.mediosTransporte = [
      {
        label: 'Ninguno',
        value: null,
      },
      {
        label: 'Bicicleta',
        value: DateValidationType.ParkingAvailabilityPerBicycle,
      },
      {
        label: 'Carro',
        value: DateValidationType.ParkingAvailabilityPerCar,
      },
      {
        label: 'Moto',
        value: DateValidationType.ParkingAvailabilityPerMotorcycle,
      },
    ];
  }

  ngOnInit(): void {
    this.form = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
    //this.datosAcomp = this.form.get('datosAcompanante') as FormGroup;
    this.numPiso = this.form.get('piso')?.value;
    this.numPersonas = this.form.get('personasReserva')?.value;
    this.medioTransporte = this.form.get('medioTransporte')?.value;
    this.medioTransporte &&
    this.medioTransporte !== DateValidationType.ParkingAvailabilityPerBicycle
      ? (this.mostrarPlaca = true)
      : (this.mostrarPlaca = false);
  }

  get transportModeName(): string {
    switch (this.medioTransporte) {
      case DateValidationType.ParkingAvailabilityPerBicycle:
        return 'Bicicleta';
      case DateValidationType.ParkingAvailabilityPerCar:
        return 'Carro';
      case DateValidationType.ParkingAvailabilityPerMotorcycle:
        return 'Moto';
      default:
        return 'Ninguno';
    }
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
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ],
      ],
      miembroOrganizacion: [false, Validators.required],
    });
    this.datosAcompanante.push(AcompananteForm);
  }

  cambiarPiso(value: number): void {
    this.numPiso += value;
    this.sharedService.numPiso$.emit(this.numPiso);
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
    this.medioTransporte = this.mediosTransporte[this.ind].value;
    this.form.patchValue({ medioTransporte: this.medioTransporte });
    
    // Si es Bici o Moto, no hay placa

    if (
      this.medioTransporte === this.mediosTransporte[1].value ||
      this.medioTransporte === this.mediosTransporte[0].value
    ) {
      this.mostrarPlaca = false;
      this.form.controls['placa'].setValue('');
    } else {
      this.mostrarPlaca = true;
    }
  }
}
