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
  sintomas!: string;

  constructor(private rootFormGroup: FormGroupDirective) {}

  ngOnInit(): void {
    this.form = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
    this.sintomas = 'No';
  }

  get f() {
    return this.form.controls;
  }

  Sintomas() {
    this.sintomas == 'No' ? (this.sintomas = 'Si') : (this.sintomas = 'No');
    this.form.patchValue({ sintomas: this.sintomas });
  }

}
