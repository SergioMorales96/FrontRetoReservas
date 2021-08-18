import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  view: number = 1;

  constructor() { }

  changeVal(val: any) {
    this.view = val;
  }

  ngOnInit(): void {
  }

}
