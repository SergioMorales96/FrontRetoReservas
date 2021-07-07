import { Component, OnInit } from '@angular/core';
import { RouteFloor } from '../../../../utils/enums';
import { FloorsService } from '../../services/floors.service';

@Component({
  selector: 'app-floors',
  templateUrl: './Floors.component.html',
  styles: [
  ]
})
export class FloorsComponent implements OnInit{
routeFloor = RouteFloor;

constructor(
  private floorsService: FloorsService
){}

ngOnInit(){
  this.floorsService.getFloors().subscribe(
    (result: any) => {
      console.log(result);
    }
    
  )}

}
