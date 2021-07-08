import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Administrador } from 'src/app/admin/interfaces/admin.interfaces';
import { AdminsService } from '../../../services/admins.service';
import { AdminResponse } from '../../../interfaces/admin.interfaces';

@Component({
  selector: 'app-view-admin',
  templateUrl: './view-admin.component.html',
  styles: [
  ]
})
export class ViewAdminComponent implements OnInit{
  admin!: Administrador;

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
