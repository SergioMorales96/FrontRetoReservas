import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SchedulesService } from 'src/app/admin/services/schedules.service';
import { Schedule, ScheduleResponse } from '../../../interfaces/schedule.interfaces';
import { RouteName } from '../../../../../utils/enums';

@Component({
  selector: 'app-schedules',
  templateUrl: './view-schedule.component.html',
  styles: [
  ]
})
export class ViewScheduleComponent implements OnInit {

  schedule!: Schedule;
  routeName = RouteName;

  get viewTitle(): string {
    return `Detalles del horario: ${this.schedule?.nombre}`;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private schedulesService: SchedulesService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(({ id }) => {
        if (id) {
          this.getSchedule(id);
        }
      });
  }

  getSchedule(id: number): void {
    this.schedulesService.getSchedule(id)
      .subscribe(
        (scheduleResponse: ScheduleResponse) => this.schedule = scheduleResponse.data
      )
  }
}
