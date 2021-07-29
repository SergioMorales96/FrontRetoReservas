import { Component, OnInit } from '@angular/core';
import { ToastsService } from '../../services/toasts.service';

@Component({
  selector: 'app-time-period-slider',
  templateUrl: './time-period-slider.component.html',
  styleUrls: ['./time-period-slider.component.scss']
})
export class TimePeriodSliderComponent implements OnInit { 
  public rangeValues!: Array<string>;
  public min="8:00";
  public max="8:00";
  public min1=0;
  public max1=0;
  public firstHour=" hora";
  public secondHour=" hora";
  public thirdHour=" hora";
  
  
  constructor(
    public toastService:ToastsService,
  ) { 
    console.log(this.rangeValues);
    this.rangeValues=['0','0'];
  }

  ngOnInit(): void {
  }


  functionHour():void{
    this.min1 = parseInt(this.rangeValues[0]) ;
    this.max1 = parseInt(this.rangeValues[1]);
    this.min = this.hourSlider(this.min1);
    this.max = this.hourSlider(this.max1);
    let range=(this.max1-this.min1)/2;
    if(range<0.5){
    this.firstHour= '-';
    this.secondHour= '0horas';
    this.thirdHour= range+0.5+'horas'; 
    }else{
      const valitionHour = range-0.5==1 ? "hora" : "horas";
      this.firstHour= range-0.5+valitionHour;
      const valitionHour1 = range==1 ? "hora" : "horas";
      this.secondHour= range+valitionHour1;
      const valitionHour2 = range+0.5==1 ? "hora" : "horas";
      this.thirdHour= range+0.5+valitionHour2;                  
    }
  }
  hourSlider(num:number):string{
    const hour=num*30;
    const hour1=Math.floor(hour/60)+8;
    let horaFin='8:00';
    if(hour%60!=0){
       horaFin=hour1+':30';
    }else{
      horaFin=hour1+':00';
    }
    return horaFin; 
  }


         
}
