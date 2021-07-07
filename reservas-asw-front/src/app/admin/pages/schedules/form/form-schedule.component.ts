import { Component,OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Schedule, Floor, DominioEstado, NombreSucursal } from '../../../interfaces/admin.interfaces';

@Component({
  selector: 'app-form',
  templateUrl: './form-schedule.component.html',
  styles: [
  ]
})
export class FormScheduleComponent implements OnInit{
  scheduleForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    maxCapacity: ['', [Validators.required]],
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
          numeroHoras: 5,
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
    this.scheduleForm.controls['maxCapacity'].setValue( schedule.numeroHoras);
    this.scheduleForm.controls['domainState'].setValue( schedule.horaInicio );
    this.scheduleForm.controls['floorId'].setValue( schedule.horaFin);
  }

  saveschedule(): void {
    console.log('save schedule', this.scheduleForm.value);
  }



}
