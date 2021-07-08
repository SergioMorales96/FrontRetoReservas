import { Component, OnInit } from '@angular/core';
import { RouteName } from 'src/utils/enums';
import { Branch } from '../../../interfaces/admin.interfaces';
import { BranchesService } from '../../../services/branches.service';

@Component({
  selector: 'app-list-branch',
  templateUrl: './list-branch.component.html',
  styleUrls: ['./list-branch.component.scss']
})
export class ListBranchComponent implements OnInit {

  ngOnInit() {
    this.getAll();
  }

  routeName = RouteName;
  branches: Branch[] = [];

  constructor(
    private api: BranchesService,
  ) { }

  deleteBranch(id: number): void {
    this.api.deleteBranch(id).subscribe(
      resultado => {
        console.log(resultado);
        this.getAll();
      })
  }

  getAll() {
    this.api.listAll().subscribe(
      resultado => {
        console.log(resultado);
        this.branches = resultado.data;
      })
  }

}
