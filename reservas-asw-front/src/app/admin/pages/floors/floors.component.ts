import { Component, OnInit } from '@angular/core';
import { RouteFloor } from '../../../../utils/enums';
import { FloorsService } from '../../services/floors.service';
import { Floor } from '../../interfaces/admin.interfaces';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-floors',
  templateUrl: './Floors.component.html',
  styles: [
  ]
})
export class FloorsComponent implements OnInit{
routeFloor = RouteFloor;

constructor(
  private floorsService: FloorsService,
  private messageService: MessageService
){}

ngOnInit(){
  this.floorsService.getFloors().subscribe(
    (result: any) => {
      console.log(result);
    } 
  )}
  
}
