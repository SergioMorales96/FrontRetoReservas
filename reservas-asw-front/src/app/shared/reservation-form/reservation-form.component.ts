import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CalendarComponent } from '../../reservations/components/calendar/calendar.component';

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
  constructor(private fb: FormBuilder) {
    this.step = 1;
    this.submitted = false;
    
  }

  ngOnInit(): void {
    this.reservaForm = this.fb.group({
      //Puesto - Step 1
      puestoInfo: this.fb.group({
        piso: [18, Validators.required],
        reserva: ['', Validators.required],
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
  }

  /*next() {
  this.step = this.step + 1;
}*/
}
