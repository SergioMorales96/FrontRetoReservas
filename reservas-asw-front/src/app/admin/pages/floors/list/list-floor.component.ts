import { Component, OnInit } from '@angular/core';
import { Floor, FloorsResponse } from 'src/app/admin/interfaces/admin.interfaces';
import { RouteFloor } from '../../../../../utils/enums';
import { FloorsService } from '../../../services/floors.service';
import { FloorResponse } from '../../../interfaces/admin.interfaces';


@Component({
  selector: 'app-list-floor',
  templateUrl: './list-floor.component.html',
  styleUrls: ['./list-floor.component.scss']
})
export class ListfloorComponent implements OnInit{
  routeFloor=RouteFloor;
  floor: Floor[] = [];

  constructor(
     private floorsService: FloorsService
    ) {}
  ngOnInit(): void {
    this.getFloors();
  }
  getFloors(){
    this.floorsService.getFloors()
    .subscribe(
      (floorsResponse: FloorsResponse )=> this.floor = floorsResponse.data
       
    );
  }
  
    deleteFloor( id: number ): void {
      this.floorsService.deleteFloor(id)
      .subscribe (
        (floorResponse: FloorResponse) => this.floor = this.floor.filter((floor: Floor) => floor.idPiso !== id)
      );
    }

}
