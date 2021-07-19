import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-form-date',
  templateUrl: './form-date.component.html',
  styleUrls: ['./form-date.component.scss'],
})
export class FormDateComponent implements OnInit {
  @Input() submitted!: boolean;
  @Input() formGroupName!: string;
  numPisoSubscriptio!: Subscription;
  form!: FormGroup;
  selectedFloo!: number;
  form2!: FormGroup;
  //@Input() numPersonas!: number;
  constructor(
    private rootFormGroup: FormGroupDirective,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.form = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
    this.form2 = this.rootFormGroup.control.get("puestoInfo") as FormGroup;

    //console.log(this.form2.get('piso')?.value);
    console.log("ad",this.form2.controls['piso'].value);
    
  }

  get f() {
    return this.form.controls;
  }
}
