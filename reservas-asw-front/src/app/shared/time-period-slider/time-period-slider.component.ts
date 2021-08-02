import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { AppState } from 'src/app/app.reducer';
import { ToastsService } from '../../services/toasts.service';
import { setTimePeriod, setStartTime, setEndTime } from '../reservation.actions';

@Component({
  selector: 'app-time-period-slider',
  templateUrl: './time-period-slider.component.html',
  styleUrls: ['./time-period-slider.component.scss']
})
export class TimePeriodSliderComponent {
  
  rangeValues!: Array<string>;
  firstHour = ' hora';
  secondHour = ' hora';
  thirdHour = ' hora';
  minValue!: number;
  maxValue!:number;
  startTime: string;
  endTime: string;

  constructor(
    private toastService: ToastsService,
    private store: Store<AppState>
  ) {
    this.startTime = '08:00 AM';
    this.endTime = '08:00 AM';
    this.rangeValues = ['0', '0'];
    console.log(this.rangeValues);
    
  }

  functionHour(maxValue:number,minValue:number): void {
    let range = (maxValue - minValue) / 2;
    if (range < 0.5) {
      this.firstHour = '-';
      this.secondHour = '0horas';
      this.thirdHour = range + 0.5 + 'horas';
    } else {
      const valitionHour = range - 0.5 == 1 ? 'hora' : 'horas';
      this.firstHour = range - 0.5 + valitionHour;
      const valitionHour1 = range == 1 ? 'hora' : 'horas';
      this.secondHour = range + valitionHour1;
      const valitionHour2 = range + 0.5 == 1 ? 'hora' : 'horas';
      this.thirdHour = range + 0.5 + valitionHour2;
    }
    this.store.dispatch( setTimePeriod({ timePeriod: range}) );
  }



  onChange( { values }: { values: (number | string)[] } ): void {

    const startDate = moment( `${ moment().format( 'YYYY-MM-DD' ) } 08:00` );
    const rangeValues = values.map( value => +value );
    this.minValue = rangeValues[0] * 30;
    this.maxValue = rangeValues[1] * 30;
    this.startTime = startDate.add( this.minValue, 'minutes' ).format( 'hh:mm A' );
    this.endTime = startDate.add( this.maxValue, 'minutes' ).format( 'hh:mm A' );
    this.functionHour(rangeValues[1],rangeValues[0]);
    console.log(this.startTime);
    this.store.dispatch( setStartTime({ startTime: this.startTime}));
    this.store.dispatch(setEndTime({endTime: this.endTime}));
  }
  

}
