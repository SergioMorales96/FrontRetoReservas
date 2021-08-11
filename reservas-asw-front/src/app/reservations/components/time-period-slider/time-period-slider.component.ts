import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { AppState } from 'src/app/app.reducer';

import { setTimePeriod, setStartTime, setEndTime, setStartSlider, setEndSlider } from '../../reservation.actions';

@Component({
  selector: 'app-time-period-slider',
  templateUrl: './time-period-slider.component.html',
  styleUrls: ['./time-period-slider.component.scss']
})
export class TimePeriodSliderComponent implements OnInit{
  
  rangeValues!: Array<string>;
  firstHour = '-';
  secondHour = '0horas';
  thirdHour = '0.5horas';
  minValue!: number;
  maxValue!:number;
  startTime!: string;
  endTime!: string;
  minvalue1!: number;
  maxvalue1!: number;

  constructor(
    private store: Store<AppState>
  ) {
    this.store
    .select( 'reservation' )
    .subscribe( reservation => {
      this.startTime = reservation.startTime;
      this.endTime = reservation.endTime;
      this.maxvalue1 = reservation.endSlider;
      this.minvalue1 = reservation.startSlider;
    } );
    if(this.startTime == ''){
      this.store.dispatch( setStartTime({ startTime: '08:00 AM'}) );
      this.store.dispatch( setEndTime({ endTime: '08:00 AM'}) );
    }
    this.functionHour(this.maxvalue1,this.minvalue1);
    this.rangeValues = [String(this.maxvalue1),String(this.minvalue1)];
  }
  ngOnInit(): void {
    this.store
    .select( 'reservation' )
    .subscribe( reservation => {
      this.startTime = reservation.startTime;
      this.endTime = reservation.endTime;
    } );
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
    this.store.dispatch( setStartTime({ startTime: this.startTime}) );
    this.endTime = startDate.add( this.maxValue, 'minutes' ).format( 'hh:mm A' );
    this.store.dispatch( setEndTime({ endTime: this.endTime}) );
    this.functionHour(rangeValues[1],rangeValues[0]);
    
    this.store.dispatch( setStartSlider({ startSlider: rangeValues[0] }));
    this.store.dispatch( setEndSlider({ endSlider: rangeValues[1] }));
  }
}
