import { Component, OnInit } from '@angular/core';
import { RouteFloor } from '../../../../../utils/enums';
import { FloorsService } from '../../../services/floors.service';
import { Floor, FloorsResponse, FloorResponse } from '../../../interfaces/floors.interfaces';


@Component({
  selector: 'app-list-floor',
  templateUrl: './list-floor.component.html',
  styleUrls: ['./list-floor.component.scss']
})
export class ListfloorComponent implements OnInit{
  routeFloor=RouteFloor;
  floors: Floor[] = [];

  constructor(
     private floorsService: FloorsService
    ) {}

  ngOnInit(): void {
    this.getFloors();
  }
  getFloors(){
    this.floorsService.getFloors()
    .subscribe(
      (floorsResponse: FloorsResponse ) => this.floors = floorsResponse.data); 
  }
  
    deleteFloor( id: number ): void {
      this.floorsService.deleteFloor(id)
      .subscribe (
        (floorResponse: FloorResponse) => this.floors = this.floors.filter((floor: Floor) => floor.idPiso !== id)
      );
    }

}
