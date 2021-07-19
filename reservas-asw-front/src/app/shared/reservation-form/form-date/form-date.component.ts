import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-form-date',
  templateUrl: './form-date.component.html',
  styleUrls: ['./form-date.component.scss']
})
export class FormDateComponent implements OnInit {

 
  @Input() formGroupName!: string;
  form!: FormGroup;
  form1!:FormGroup;
  numPersonas!: number;
  @Input() submitted!: boolean;
  //@Input() numPersonas!: number;
  constructor(private rootFormGroup: FormGroupDirective) {
  }

  ngOnInit(): void {
    this.form = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
    this.form1 = this.rootFormGroup.control.get("puestoInfo") as FormGroup;
    this.numPersonas = this.form1.get('personasReserva')?.value;
    console.log(this.numPersonas);
  }





  get f(){return this.form.controls}

}
