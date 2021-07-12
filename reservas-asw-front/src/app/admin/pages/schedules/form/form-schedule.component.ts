import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SchedulesService } from 'src/app/admin/services/schedules.service';
import { Schedule, ScheduleResponse, ScheduleClass, NombreSucursal } from '../../../interfaces/schedule.interfaces';
import { RouteName } from '../../../../../utils/enums';
import { ToastsService } from 'src/app/services/toasts.service';
import { Branch } from '../../../interfaces/branch.interfaces';
import * as moment from 'moment';

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
    idSucursal: ['', [Validators.required]],
  });

  branches: Branch[] = [
    {
      idSucursal : 1,
      aforoMaximo : 300,
      direccion :  "BOGOTA"  ,
      nit : "9000001"  ,
      nombre: "TORRE SIGMA"   ,
      nombreEmpresa: "ASESOFTWARE"
    },
  ];

  isEditing: boolean = false;
  schedule!: Schedule;

  get formTitle(): string {
    return this.isEditing ? (this.schedule?.nombre ?? 'Editar Horario') : 'Crear Horario';
  }

  get buttonLabel(): string {
    return this.isEditing ? 'Actualizar' : 'Crear';
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private schedulesService: SchedulesService,
    private router: Router,
    private toastService: ToastsService
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
      idSucursal: this.scheduleForm.controls['idSucursal'].value,
    }
  }

  setschedule(schedule: Schedule): void {
    this.scheduleForm.controls['name'].setValue(schedule.nombre);
    this.scheduleForm.controls['numHours'].setValue(schedule.numeroHoras);
    this.scheduleForm.controls['initHour'].setValue(schedule.horaInicio);
    this.scheduleForm.controls['endHour'].setValue(schedule.horaFin);
    this.scheduleForm.controls['idSucursal'].setValue(schedule.idSucursal);
  }

  validateDates(): boolean {
    const date = moment(`${new Date()}`).format('YYYY-MM-DD');
    const startDate = moment(`${date} ${this.scheduleForm.controls['initHour'].value}`);
    const endDate = moment(`${date} ${this.scheduleForm.controls['endHour'].value}`);
    return endDate.isAfter(startDate);
  }

  saveSchedule(): void {
    if (!this.validateDates()) {
      this.toastService.showToastWarning({ summary: 'Advertencia', detail: 'La fecha final debe ser posterior a la fecha inicial.' });
      return;
    }
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
        (scheduleResponse: ScheduleResponse) => {
          this.router.navigateByUrl(RouteName.SchedulesList);
          this.toastService.showToastSuccess({ summary: 'Horario creado', detail: 'El horario ha sido creado correctamente.' });
        });
  }

  updateSchedule() {
    this.schedulesService.updateSchedule({
      ...this.getScheduleFormValue(),
      idHorario: this.schedule.idHorario
    })
      .subscribe(
        (scheduleResponse: ScheduleResponse) => {
          this.router.navigateByUrl(RouteName.SchedulesList);
          this.toastService.showToastSuccess({ summary: 'Horario actualizado', detail: 'El horario ha sido actualizado correctamente.' });
        });
  }

}