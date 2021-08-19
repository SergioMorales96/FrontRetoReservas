import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../app.reducer';

@Component({
  selector: 'app-form-date',
  templateUrl: './form-date.component.html',
  styleUrls: ['./form-date.component.scss'],
})
export class FormDateComponent implements OnInit {

  @Input() submitted!: boolean;
  @Input() formGroupName!: string;

  form!: FormGroup;
  capacity: number=0;

  constructor(
    private rootFormGroup: FormGroupDirective,
    private store: Store<AppState>
  ) {

    this.store.select('reservation')
    .subscribe((reservation) => {
      this.capacity=reservation.capacity; 
      console.log(reservation.capacity);
    });
  }

  ngOnInit(): void {
    this.form = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
    this.store.select('reservation').subscribe((reservation) => {
      this.capacity=reservation.capacity;     
    });
  }
}
