import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormGroupDirective,
  FormBuilder,
  FormArray,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import * as actions from '../../reservation.actions';
import { DateValidationType } from '../../../../utils/enums';
import { EmittedValue } from '../../interfaces/shared.interfaces';

interface MeanOfTransport {
  label: string;
  value: any;
}

@Component({
  selector: 'app-form-workstation',
  templateUrl: './form-workstation.component.html',
  styleUrls: ['./form-workstation.component.scss'],
})
export class FormWorkstationComponent implements OnInit {

  @Input() formGroupName!: string;
  @Input() submitted!: boolean;
  
  form!: FormGroup;
  peopleNumber!: number;
  floorNumber!: number;
  meansOfTransport: MeanOfTransport[] = [];
  meanOfTransport!: number | null;
  reservationId!: number;
  showLicensePlate!: boolean;

  private vehiclesWithLicensePlates: { key: string, value: number } [];

  constructor(
    private rootFormGroup: FormGroupDirective,
    private fb: FormBuilder,
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
    this.vehiclesWithLicensePlates = [
      {
        key: 'Carro',
        value: 1
      },
      {
        key: 'Moto',
        value: 2
      },
    ];
  }

  ngOnInit(): void {

    this.form = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
    this.floorNumber = this.form.get('piso')?.value;
    this.peopleNumber = this.form.get('personasReserva')?.value;
    this.meanOfTransport = this.form.get('medioTransporte')?.value;
    this.reservationId = this.form.get('reserva')?.value;
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

  get formControls(): any {

    return this.form.controls;

  }
  
  get peopleData(): FormArray {

    return this.formControls['datosAcompanante'] as FormArray;

  }

  removePeople(): void {

    this.peopleData.removeAt(this.peopleData.length - 1);

  }

  addPeople(): void {

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

  onChangeFloor( selectedFloor: EmittedValue ): void {

    this.floorNumber = selectedFloor.value;
    this.formControls['piso'].setValue( this.floorNumber ); 
    this.store.dispatch( actions.setFloorNumber({ floorNumber: this.floorNumber}) );

  }

  onChangeReservation( selectedReservation: EmittedValue ): void {

    this.reservationId = selectedReservation.value;
    this.formControls['reserva'].setValue( this.reservationId ); 
    this.store.dispatch( actions.setReservationId({ reservationId: this.reservationId}) );

  }

  onChangePeople( selectedPeople: EmittedValue ): void {

    this.peopleNumber = selectedPeople.value;
    this.formControls['personasReserva'].setValue(this.peopleNumber);
    this.store.dispatch( actions.setPeopleNumber({ peopleNumber: this.peopleNumber }) );

    if ( selectedPeople.nextValue ) {
      this.addPeople();
    } else {
      this.removePeople();
    }

  }

  onChangeTransport( selectedTransport: EmittedValue ): void {

    this.meanOfTransport = selectedTransport.value;
    this.formControls['medioTransporte'].setValue( this.meanOfTransport );
    this.store.dispatch( actions.setMeanOfTransport({ meanOfTransportId: this.meanOfTransport || 0 }) );

    this.showLicensePlate = this.vehiclesWithLicensePlates
      .map( vehicles => vehicles.value )
      .includes( this.meanOfTransport || 0 );

    if ( !this.showLicensePlate ) {
      this.formControls['placa'].setValue('');
    }

  }

}
