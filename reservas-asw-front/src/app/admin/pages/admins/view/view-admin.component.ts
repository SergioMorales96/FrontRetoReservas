import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-admin',
  templateUrl: './view-admin.component.html',
  styles: [
  ]
})
export class ViewAdminComponent {

  constructor(
    private activatedRoute:ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe( ({ id }) => console.log( id ));    
   }

}
