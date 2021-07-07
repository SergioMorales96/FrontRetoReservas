import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Branch } from '../../../interfaces/admin.interfaces';

@Component({
  selector: 'app-view-branch',
  templateUrl: './view-branch.component.html',
  styles: [
  ]
})
export class ViewBranchComponent implements OnInit {

  branch!: Branch;

  get viewTitle(): string {
    return this.branch.nombreEmpresa ? this.branch.nombreEmpresa : 'Ver sucursal';
  }


  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(({ id }) => {
        if ( id ) {
          console.log( 'branch id', id );

          this.branch = {
            idSucursal:     1,
            aforoMaximo:    23,
            direccion:      "calle 93",
            nit:            "9000",
            nombre:         "Torre sigma 1",
            nombreEmpresa: "asesoftware"
            
          }
        }
      });
  }

}
