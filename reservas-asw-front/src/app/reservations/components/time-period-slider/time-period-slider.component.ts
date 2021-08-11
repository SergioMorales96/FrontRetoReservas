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
  rangeValues2!: Array<number>;
  minValue!: number;
  maxValue!:number;
  startTime!: string;
  endTime!: string;
  hour1:number=0;
  hour2:number=0;
  hour:number=0;
  simbol:string="<";
  simbol2:string=">";

  constructor(
    private store: Store<AppState>
  ) {
    this.store
    .select( 'reservation' )
    .subscribe( reservation => {
      this.startTime = reservation.startTime;
      this.endTime = reservation.endTime; 
      this.hour2 = reservation.endSlider;
      this.hour1= reservation.startSlider;   
    } );
    if(this.startTime == ''){
      this.store.dispatch( setStartTime({ startTime: '08:00 AM'}) );
      this.store.dispatch( setEndTime({ endTime: '08:00 AM'}) );
    }
    this.functionHour(this.maxValue,this.minValue);
    this.rangeValues = ['0','0'];
  }
  ngOnInit(): void {
      this.store
     .select( 'reservation' )
     .subscribe( reservation => {
      this.startTime = reservation.startTime;
      this.endTime = reservation.endTime;
    } );
  }
  importValue(hour:number,currentTime:number):void{
    this.hour1=currentTime;
    this.hour2=this.hour1+hour;
    this.hour=hour;
    this.rangeValues = [String(this.hour1),String(this.hour2)];
    this.rangeValues2 = [this.hour1,this.hour2];
   this.onChange();
  }
  importValue2():void{ 
    this.hour1+=1;
    this.hour2+=1;
    if(this.hour2>=this.hour1 && this.hour2<=18){
    this.rangeValues = [String(this.hour1),String(this.hour2)];
    this.rangeValues2 = [this.hour1,this.hour2];
    }else{
    this.hour1=0;
    this.hour2=this.hour;
    this.rangeValues = [String(this.hour1),String(this.hour2)];
    this.rangeValues2 = [this.hour1,this.hour2];
    }
     this.onChange();
  }

  importValue3():void{ 
    this.hour1-=1;
    this.hour2-=1;
    if(this.hour2>=this.hour1 && this.hour1>=0){
    this.rangeValues = [String(this.hour1),String(this.hour2)];
    this.rangeValues2 = [this.hour1,this.hour2];
    }else{
    this.hour1=18-this.hour;
    this.hour2=18;
    this.rangeValues = [String(this.hour1),String(this.hour2)];
    this.rangeValues2 = [this.hour1,this.hour2];
    }  
    this.onChange();  
  }

  functionHour(maxValue:number,minValue:number): void {
    let range = (maxValue - minValue) / 2;
    this.store.dispatch( setTimePeriod({ timePeriod: range}) );
  }
  onChange(): void {
    let startDate = moment( `${ moment().format( 'YYYY-MM-DD' ) } 08:00` );
    this.minValue = this.rangeValues2[0] * 30;
    this.maxValue = this.rangeValues2[1] * 30;
    this.startTime = startDate.add( this.minValue, 'minutes' ).format( 'hh:mm A' );
    this.store.dispatch( setStartTime({ startTime: this.startTime}) );
    startDate = moment( `${ moment().format( 'YYYY-MM-DD' ) } 08:00` );
    this.endTime = startDate.add( this.maxValue, 'minutes' ).format( 'hh:mm A' );
    this.store.dispatch( setEndTime({ endTime: this.endTime}) );
    this.functionHour(this.rangeValues2[1],this.rangeValues2[0]);
    
     this.store.dispatch( setStartSlider({ startSlider: this.rangeValues2[0] }));
     this.store.dispatch( setEndSlider({ endSlider: this.rangeValues2[1] }));
  }
}
 