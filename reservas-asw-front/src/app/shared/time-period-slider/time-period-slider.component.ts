import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-period-slider',
  templateUrl: './time-period-slider.component.html',
  styleUrls: ['./time-period-slider.component.scss']
})
export class TimePeriodSliderComponent implements OnInit { 
  public rangeValues!: Array<string>;
  public min="hola";
  public max="hola";
 // public countries!:String[];
 public rangeHour=[
   {
     id:1,
     value:"8:00",
   },
   {
    id:2,
    value:"8:30",
  },
  {
    id:3,
    value:"9:00",
  },
  {
    id:4,
    value:"9:30",
  },
  {
    id:5,
    value:"10:00",
  },
  {
    id:6,
    value:"10:30",
  },
  {
    id:7,
    value:"11:00",
  },
  {
    id:8,
    value:"11:30",
  },
  {
    id:9,
    value:"12:00",
  },{
    id:10,
    value:"12:30",
  },
  {
    id:11,
    value:"13:00",
  },
  {
    id:12,
    value:"13:30",
  },{
    id:13,
    value:"14:00",
  },{
    id:14,
    value:"14:30",
  },{
    id:15,
    value:"15:00",
  },
  {
    id:17,
    value:"15:30",
  },
  {
    id:18,
    value:"16:00",
  },{
    id:19,
    value:"16:30",
  },
  {
    id:20,
    value:"17:00",
  },
 ]
  public countries = [
    "India",
    "United States of America \\\n",
    "United Kingdom"
     ];
  constructor() { 
    console.log(this.rangeValues);
  }

  ngOnInit(): void {
     //console.log(this.rangeValues);
  }
  verrange():void{
     const min1 = parseInt(this.rangeValues[0]) ;
     const max1 = parseInt(this.rangeValues[1]);
     this.min = this.rangeHour[min1].value;
     this.max = this.rangeHour[max1].value;
    console.log(this.min);
    console.log(this.max);
    console.log(this.rangeValues[0]);
  }
  

}
