import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminsService } from '../../../services/admins.service';
import { RouteName } from '../../../../../utils/enums';
import { Administrador, AdminResponse } from '../../../interfaces/admins.interfaces';

@Component({
  selector: 'app-view-admin',
  templateUrl: './view-admin.component.html',
  styles: [
  ]
})
export class ViewAdminComponent implements OnInit{

  admin!: Administrador;
  routeName = RouteName;
  email!: string;

  get viewTitle(): string {
    return this.admin?.email ? this.admin?.email : 'Ver administrador';
  }

  constructor(
    private activatedRoute:ActivatedRoute,
    private adminsService: AdminsService
  ) {
    
   }
  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(({ id }) => {
        if (id) {
          this.getAdmin(id);
          }
        }
      );
  }


  getAdmin(id : number): void{
    this.adminsService.getAdmin(id)
      .subscribe(
        (adminResponse:AdminResponse) => this.admin = adminResponse.data
      )
  }

}
