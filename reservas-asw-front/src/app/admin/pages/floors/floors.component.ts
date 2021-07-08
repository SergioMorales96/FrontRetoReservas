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

// getFloor(): void {
// this.floorsService.getFloors().subscribe(
//   (result: any) => {
//    let floor = result as Floor;
//    floors.push(floor);
//    }  
//   )
// }

// createFloor(): void {
//   this.floorsService.createFloor( floor ).subscribe(
//     (result: any) => {
//       let floor = result as Floor;
//       this.floors.push(floor);
//       this.messageService.add({severity: 'Success',summary: 'Message', detail: 'Se guardo informacion correctamnet'});
//     }
//   )
// }

ngOnInit(){
}
}
