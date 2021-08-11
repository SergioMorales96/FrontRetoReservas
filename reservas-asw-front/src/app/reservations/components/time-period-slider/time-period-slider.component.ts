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
  minvalue1!: number;
  maxvalue1!:number;
  startTime!: string;
  endTime!: string;
<<<<<<< HEAD
  minvalue1!: number;
  maxvalue1!: number;
  initialTime:number=0;
  finalTime:number=0;
=======
  hour1:number=0;
  hour2:number=0;
>>>>>>> 91f1d01f3213c6e4157ba6a3dd832c3d466f5670
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
    } );
    if(this.startTime == ''){
      this.store.dispatch( setStartTime({ startTime: '08:00 AM'}) );
      this.store.dispatch( setEndTime({ endTime: '08:00 AM'}) );
    }
    this.functionHour(this.maxvalue1,this.minvalue1);  
  }
  ngOnInit(): void {
      this.store
     .select( 'reservation' )
     .subscribe( reservation => {
      this.startTime = reservation.startTime;
      this.endTime = reservation.endTime;
      this.maxvalue1 = reservation.endSlider;
      this.minvalue1 = reservation.startSlider;
      this.hour=reservation.endSlider-reservation.startSlider;
    } );
    this.rangeValues = [String(this.minvalue1),String(this.maxvalue1)];
  }
  importValue(hour:number,currentTime:number):void{
    this.initialTime=currentTime;
    this.finalTime=this.initialTime+hour;
    this.hour=hour;
<<<<<<< HEAD
    this.rangeValues = [String(this.initialTime),String(this.finalTime)];
    this.rangeValues2 = [this.initialTime,this.finalTime];
    this.onChange();
=======
    this.rangeValues = [String(this.hour1),String(this.hour2)];
    this.rangeValues2 = [this.hour1,this.hour2];
   this.onChange();
>>>>>>> 91f1d01f3213c6e4157ba6a3dd832c3d466f5670
  }
  nextValue():void{ 
    this.initialTime+=1;
    this.finalTime+=1;
    if(this.finalTime>=this.initialTime && this.finalTime<=18){
    this.rangeValues = [String(this.initialTime),String(this.finalTime)];
    this.rangeValues2 = [this.initialTime,this.finalTime];
    }else{
    this.initialTime=0;
    this.finalTime=this.hour;
    this.rangeValues = [String(this.initialTime),String(this.finalTime)];
    this.rangeValues2 = [this.initialTime,this.finalTime];
    }
     this.onChange();
  }

  previousValue():void{ 
    this.initialTime-=1;
    this.finalTime-=1;
    if(this.finalTime>=this.initialTime && this.initialTime>=0){
    this.rangeValues = [String(this.initialTime),String(this.finalTime)];
    this.rangeValues2 = [this.initialTime,this.finalTime];
    }else{
<<<<<<< HEAD
    this.initialTime=18-this.hour;
    this.finalTime=18;
    this.rangeValues = [String(this.initialTime),String(this.finalTime)];
    this.rangeValues2 = [this.initialTime,this.finalTime];
    }
    
    this.onChange();
    
=======
    this.hour1=18-this.hour;
    this.hour2=18;
    this.rangeValues = [String(this.hour1),String(this.hour2)];
    this.rangeValues2 = [this.hour1,this.hour2];
    }  
    this.onChange();  
>>>>>>> 91f1d01f3213c6e4157ba6a3dd832c3d466f5670
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
 