import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { DateValidationType } from '../../../../utils/enums';

@Component({
  selector: 'app-form-date',
  templateUrl: './form-date.component.html',
  styleUrls: ['./form-date.component.scss'],
})
export class FormDateComponent implements OnInit {
  @Input() submitted!: boolean;
  @Input() formGroupName!: string;
  form!: FormGroup;
  formWorkstationInfo!: FormGroup;
  numFloor!: number;
  numPeople!: number;
  valType!: DateValidationType;
  constructor(
    private rootFormGroup: FormGroupDirective,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.form = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
    this.formWorkstationInfo = this.rootFormGroup.control.get(
      'puestoInfo'
    ) as FormGroup;

    this.numFloor = this.formWorkstationInfo.controls['piso'].value;
    this.numPeople = this.formWorkstationInfo.controls['personasReserva'].value;
    this.valType = this.formWorkstationInfo.controls['medioTransporte'].value;
  }
}
