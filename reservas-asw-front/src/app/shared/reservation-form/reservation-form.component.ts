import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { DateValidationType } from '../../../utils/enums';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { setFloorNumber, setPeopleNumber, setWorkstation, setSymptoms, setSteps } from '../reservation.actions';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss'],
})
export class ReservationFormComponent implements OnInit {
  reservaForm!: FormGroup;
  step: number;
  submitted: boolean;
  numPersonas!: number;

  public floorId!: number;
  public numberPersons!: number;
  public validationType!: DateValidationType;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private store: Store<AppState>
    ) {
    this.step = 1;
    this.submitted = false;
    this.store.dispatch( setSteps({step: this.step}) );
  }

  ngOnInit(): void {

    this.dataService.floorId$
      .subscribe( ( floorId: number ) => this.floorId = floorId );
    this.dataService.numberPersons$
      .subscribe( ( numberPersons: number ) => this.numberPersons = numberPersons );
    this.dataService.validationType$
      .subscribe( ( validationType: number ) => this.validationType = validationType );

    this.reservaForm = this.fb.group({
      //Puesto - Step 1
      puestoInfo: this.fb.group({
        piso: [18, Validators.required],
        reserva: [1, Validators.required],
        personasReserva: [1, Validators.required],
        datosAcompanante: this.fb.array([]),
        medioTransporte: [null],
        placa: [
          '',
          [
            Validators.maxLength(7),
            Validators.pattern(/^[a-zA-Z]{3}-[0-9]{2}[a-zA-Z0-9]{1}$/),
          ],
        ],
      }),
      //Fecha - Step 2
      fechaInfo: this.fb.group({
        periodoTiempo: [''],
        fecha: [''],
      }),
      //Fecha - Step 3
      asistenteInfo: this.fb.group({
        nombres: ['', Validators.required],
        identificacion: ['', Validators.required],
        grupoRiesgo: ['No Aplica', Validators.required],
        convivenciaRiesgo: ['No', Validators.required],
        sintomas: ['No', Validators.required],
        descripcion: ['', Validators.required],
      }),
    });
    //console.log(this.reservaForm.get('personasReserva')?.value);
    this.store.dispatch( setFloorNumber({ floorNumber: 18}) );
    this.store.dispatch( setPeopleNumber({ peopleNumber: 1}) );
    this.store.dispatch( setSymptoms({ symptoms: 'No'}) );

  }

  


  get puestoInfo() {
    return this.reservaForm.get('puestoInfo');
  }

  get asistenteInfo() {
    return this.reservaForm.get('asistenteInfo');
  }

  submit() {
    this.submitted = true;
    switch (this.step) {
      case 1:
        if (this.reservaForm.controls.puestoInfo.invalid) {          
          return;
        } else {
          this.submitted = false;
          /*if(this.reservaForm.get('personasReserva')?.value != null){
            this.calendario.numberOfPeople(this.reservaForm.get('personasReserva')?.value);
          }*/
         // this.numPersonas = this.reservaForm.get('personasReserva')?.value;
         // console.log(this.reservaForm.get('personasReserva')?.value);
        }
        break;
      case 2:
        if (this.reservaForm.controls.fechaInfo.invalid) {
          return;
        } else this.submitted = false;
        break;
      case 3:
        if (this.reservaForm.controls.asistenteInfo.invalid) {
          return;
        } else {
          this.submitted = false;
        }
        break;
    }
    this.step += 1;    
    this.store.dispatch( setSteps({step: this.step}) );
    
    /*if (this.reservaForm.controls.puestoInfo.invalid && this.step == 1){
      return;
    }
    if (this.reservaForm.controls.fechaInfo.invalid && this.step == 2) {
      return;
    }
    this.step = this.step + 1;
    console.log(this.step);*/

    /*if(this.step == 4) {
      MOSTRAR EL TOAST
  }*/
  }

  previous() {
    this.step = this.step - 1;
    this.store.dispatch( setSteps({step: this.step}) );
  }

  /*next() {
  this.step = this.step + 1;
}*/
}
