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
  numPisoSubscriptio!: Subscription;
  form!: FormGroup;
  form2!: FormGroup;
  numberPisos!: number;
  numberPeople!: number;
  valType!: DateValidationType;
  //@Input() numPersonas!: number;
  constructor(
    private rootFormGroup: FormGroupDirective,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.form = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
    this.form2 = this.rootFormGroup.control.get("puestoInfo") as FormGroup;

    this.numberPisos = this.form2.controls['piso'].value;
    this.numberPeople = this.form2.controls['personasReserva'].value;
    this.valType = this.form2.controls['medioTransporte'].value;
    //console.log("Num piso desde form-date (Step 2) "+ this.numberPisos);
    //console.log("Entrando a Step 2 y enviando PISO por serviceData");
    //this.dataService.numPiso$.emit(this.numberPisos);
  }

  get f() {
    return this.form.controls;
  }
}
