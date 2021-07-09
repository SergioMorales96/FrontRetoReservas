import { Component, OnInit } from '@angular/core';
import { RouteName } from 'src/utils/enums';
import { Branch, BranchesResponse, BranchResponse } from '../../../interfaces/branches.interfaces';
import { BranchesService } from '../../../services/branches.service';

@Component({
  selector: 'app-list-branch',
  templateUrl: './list-branch.component.html',
  styleUrls: ['./list-branch.component.scss']
})
export class ListBranchComponent implements OnInit {

  routeName = RouteName;
  branches: Branch[] = [];

  constructor(
    private branchesService: BranchesService,
  ) { }

  ngOnInit(): void {
    this.getBranches();
  }

  getBranches() {
    this.branchesService.getBranches()
      .subscribe(
        (branchesRespose: BranchesResponse) => this.branches = branchesRespose.data
      );
  }

  deleteBranch(id: number): void {
    this.branchesService.deleteBranch(id)
      .subscribe(
        (branchResponse: BranchResponse) => this.branches = this.branches.filter((branch: Branch) => branch.idSucursal !== id)
        );
  }



}
