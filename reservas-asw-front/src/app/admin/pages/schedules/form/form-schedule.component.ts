import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SchedulesService } from 'src/app/admin/services/schedules.service';
import { Schedule, ScheduleResponse, ScheduleClass } from '../../../interfaces/schedule.interfaces';
import { RouteName } from '../../../../../utils/enums';

@Component({
  selector: 'app-form',
  templateUrl: './form-schedule.component.html',
  styles: [
  ]
})
export class FormScheduleComponent implements OnInit {
  scheduleForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    numHours: ['', [Validators.required]],
    initHour: ['', [Validators.required]],
    endHour: ['', [Validators.required]],
    iSucursal: ['', [Validators.required]],
  });

  opciones: any[] = [
    {
      idSucursal: 1,
      nombre: "TORRE SIGMA",
    },
  ];

  isEditing: boolean = false;
  schedule!: Schedule;

  get formTitle(): string {
    return this.isEditing ? (this.schedule.nombre ?? 'Editar Horario') : 'Crear Horario';
  }

  get buttonLabel(): string {
    return this.isEditing ? 'Actualizar' : 'Crear';
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private schedulesService: SchedulesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(({ id }) => {
        if (id) {
          this.isEditing = true;
          this.getSchedule(id);
        } else {
          this.schedule = new ScheduleClass();
        }
      });
  }

  getScheduleFormValue(): Schedule {
    return {
      numeroHoras: this.scheduleForm.controls['numHours'].value,
      nombre: this.scheduleForm.controls['name'].value,
      horaFin: this.scheduleForm.controls['endHour'].value,
      horaInicio: this.scheduleForm.controls['initHour'].value,
      idSucursal: this.scheduleForm.controls['iSucursal'].value,
    }
  }

  setschedule(schedule: Schedule): void {
    this.scheduleForm.controls['name'].setValue(schedule.nombre);
    this.scheduleForm.controls['numHours'].setValue(schedule.numeroHoras);
    this.scheduleForm.controls['initHour'].setValue(schedule.horaInicio);
    this.scheduleForm.controls['endHour'].setValue(schedule.horaFin);
    this.scheduleForm.controls['iSucursal'].setValue(schedule.idSucursal);
  }

  saveSchedule(): void {
    if (this.isEditing) {
      this.updateSchedule();
    } else {
      this.addSchedule();
    }
  }

  getSchedule(id: number): void {
    this.schedulesService.getSchedule(id)
      .subscribe(
        (scheduleResponse: ScheduleResponse) => {
          this.schedule = scheduleResponse.data;
          this.setschedule(this.schedule);
        }
      )
  }

  addSchedule() {
    this.schedulesService.addSchedule(this.getScheduleFormValue())
      .subscribe(
        (scheduleResponse: ScheduleResponse) => this.router.navigateByUrl(RouteName.SchedulesList)
      );
  }

  updateSchedule() {
    this.schedulesService.updateSchedule({
      ...this.getScheduleFormValue(),
      idHorario: this.schedule.idHorario
    })
      .subscribe(
        (scheduleResponse: ScheduleResponse) => this.router.navigateByUrl(RouteName.SchedulesList)
      );
  }

}