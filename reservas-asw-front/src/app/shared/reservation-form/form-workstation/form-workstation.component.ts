import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormGroupDirective,
  FormBuilder,
  FormArray,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { setFloorNumber, setPeopleNumber, setMeanOfTransport } from '../../reservation.actions';
import { DateValidationType } from '../../../../utils/enums';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-form-workstation',
  templateUrl: './form-workstation.component.html',
  styleUrls: ['./form-workstation.component.scss'],
})
export class FormWorkstationComponent implements OnInit {

  @Input() formGroupName!: string;
  @Input() submitted!: boolean;
  
  form!: FormGroup;
  numPeople!: number;
  meansOfTransport: { label: string; value: any }[] = [];
  meanOfTransport!: number | null;
  ind: number = 0;
  showLicensePlate!: boolean;
  numFloor!: number;

  constructor(
    private rootFormGroup: FormGroupDirective,
    private fb: FormBuilder,
    private dataService: DataService,
    private store: Store<AppState>
  ) {
    this.meansOfTransport = [
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
    this.numFloor = this.form.get('piso')?.value;
    this.numPeople = this.form.get('personasReserva')?.value;
    this.meanOfTransport = this.form.get('meanOfTransport')?.value;
    this.meanOfTransport &&
    this.meanOfTransport !== DateValidationType.ParkingAvailabilityPerBicycle
      ? (this.showLicensePlate = true)
      : (this.showLicensePlate = false);
      
  }

  get transportModeName(): string {
    switch (this.meanOfTransport) {
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

  get formControls() {
    return this.form.controls;
  }
  
  get peopleData() {
    return this.formControls['datosAcompanante'] as FormArray;
  }

  removePeople() {
    this.peopleData.removeAt(this.peopleData.length - 1);
  }

  addPeople() {
    const peopleReservation = this.fb.group({
      correo: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ],
      ],
      miembroOrganizacion: [false, Validators.required],
    });
    this.peopleData.push(peopleReservation);
  }

  cambiarPiso(value: number): void {
    this.numFloor += value;
    this.form.controls['piso'].setValue(this.numFloor); //Otra forma
    this.numFloor += value;
    this.formControls['piso'].setValue(this.numFloor); 
    this.store.dispatch( setFloorNumber({ floorNumber: this.numFloor}) );
  }

  changePeople(value: number): void {
    this.numPeople += value;
    this.formControls['personasReserva'].setValue(this.numPeople);
    this.store.dispatch( setPeopleNumber({ peopleNumber: this.numPeople }) );
  }

  changeTransport(value: number): void {
    this.ind += value;
    this.ind < 0 ? (this.ind = 3) : this.ind > 3 ? (this.ind = 0) : true;
    this.meanOfTransport = this.meansOfTransport[this.ind].value;
    this.formControls['medioTransporte'].setValue(this.meanOfTransport );
    this.store.dispatch( setMeanOfTransport({ meanOfTransport: this.meanOfTransport}) );
    if (this.meanOfTransport != null) {
      
    }

    if (
      this.meanOfTransport === this.meansOfTransport[1].value ||
      this.meanOfTransport === this.meansOfTransport[0].value
    ) {
      this.showLicensePlate = false;
      this.formControls['placa'].setValue('');
    } else {
      this.showLicensePlate = true;
    }
  }
 
}
