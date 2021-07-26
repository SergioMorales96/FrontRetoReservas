import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-form-assistant',
  templateUrl: './form-assistant.component.html',
  styleUrls: ['./form-assistant.component.scss']
})
export class FormAssistantComponent implements OnInit {

  @Input() formGroupName!: string;
  @Input() submitted!: boolean;

  form!: FormGroup;
  symptoms!: string;

  constructor(private rootFormGroup: FormGroupDirective) {}

  ngOnInit(): void {
    this.form = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
    this.symptoms = 'No';
  }

  get formControls() {
    return this.form.controls;
  }

  Symptoms() {
    this.symptoms == 'No' ? (this.symptoms = 'Si') : (this.symptoms = 'No');
    this.formControls['sintomas'].setValue(this.symptoms );
  }

}
