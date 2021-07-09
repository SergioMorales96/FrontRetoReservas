import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FloorsService } from '../../../services/floors.service';
import { Floor, FloorResponse } from '../../../interfaces/floors.interfaces';


@Component({
  selector: 'app-view-floor',
  templateUrl: './view-floor.component.html',
  styles: [
  ]
})
export class ViewFloorComponent implements OnInit {

  floor!: Floor;

  get viewTitle(): string{
    return this.floor?.nombre ? this.floor.nombre : 'Ver piso'

  }
  constructor(
    private activatedRoute: ActivatedRoute,
    private floorsService: FloorsService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
    .subscribe(({ id }) => {
      if ( id ){
       this.getFloor(id);

      }
    });
  }

  getFloor(id: number): void {
    this.floorsService.getFloor(id)
    .subscribe(
      (floorResponse: FloorResponse) =>  this.floor = floorResponse.data
      )  
  }

}