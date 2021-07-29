import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'reservas-asw-front';
  display: boolean = false;
  responsive: boolean = true;

  items: MenuItem[] = [];

  ngOnInit(): void {
    this.items = [
    ]
  }
}
