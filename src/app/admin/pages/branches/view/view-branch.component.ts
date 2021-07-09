import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Branch, BranchResponse } from '../../../interfaces/branches.interfaces';
import { BranchesService } from '../../../services/branches.service';
import { RouteName } from '../../../../../utils/enums';

@Component({
  selector: 'app-view-branch',
  templateUrl: './view-branch.component.html',
  styles: [
  ]
})
export class ViewBranchComponent implements OnInit {

  branch!: Branch;
  routeName = RouteName;

  get viewTitle(): string {
    return this.branch?.nombre ? this.branch.nombre : 'Ver sucursal';
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private branchesService: BranchesService
  ) { }


  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(({ id }) => {
        if (id) {
          this.getBranch(id);
        }
      });
  }

  getBranch(id: number): void {
    this.branchesService.getBranch(id)
      .subscribe(
        (branchResponse: BranchResponse) => this.branch = branchResponse.data
      )
  }

}
