import { Component,OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Schedule, Branch, NombreSucursal } from '../../../interfaces/admin.interfaces';

@Component({
  selector: 'app-form',
  templateUrl: './form-schedule.component.html',
  styles: [
  ]
})
export class FormScheduleComponent implements OnInit{
  scheduleForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    numHours: ['', [Validators.required]],
    initHour: ['', [Validators.required]],
    endHour: ['', [Validators.required]],
    branch: ['', [Validators.required]],
  });
  branches: Branch[] = [
    {
      "idSucursal": 1,
      "aforoMaximo": 300,
      "direccion": "BOGOTA",
      "nit": "9000001",
      "nombre": "TORRE SIGMA",
      "nombreEmpresa": "ASESOFTWARE"
    },
  ];
  isEditing: boolean = false;
  schedule!: Schedule;

  get formTitle(): string {
    return this.isEditing ? ( this.schedule.nombre ?? 'Editar Horario' ) : 'Crear Horario';
  }

  get buttonLabel(): string {
    return this.isEditing ? 'Actualizar' : 'Crear';
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(({ id }) => {
        if ( id ) {
          this.isEditing = true;
          console.log( 'Schedule id', id );

          this.schedule = {
          idHorario: 1,
          idSucursal:1,
          numeroHoras: 8,
          horaInicio: "15:00",
          horaFin: "18:00",
          nombre: "HORARIO 1",
          nombreSucursal:NombreSucursal.TorreSigma
          }

          this.setschedule( this.schedule );
        }
      });
  }

  setschedule( schedule: Schedule ): void {
    this.scheduleForm.controls['name'].setValue( schedule.nombre );
    this.scheduleForm.controls['numHours'].setValue( schedule.numeroHoras);
    this.scheduleForm.controls['initHour'].setValue( schedule.horaFin);
    this.scheduleForm.controls['endHour'].setValue( schedule.horaFin);
    this.scheduleForm.controls['branch'].setValue( schedule.nombreSucursal);
  }

  saveschedule(): void {
    console.log('save schedule', this.scheduleForm.value);
  }



}
