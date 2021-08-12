import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { EmittedValue } from '../../interfaces/shared.interfaces';

@Component({
  selector: 'app-data-selector',
  templateUrl: './data-selector.component.html',
  styleUrls: ['./data-selector.component.scss']
})
export class DataSelectorComponent implements OnChanges {

  @Input() data: any[];
  @Input() initialValue!: any;
  @Input() label!: string;
  @Input() value!: string;
  @Output() onCurrentValue: EventEmitter<EmittedValue>;

  private currentPosition: number;

  get currentValue(): any {
    return this.label ? this.data[this.currentPosition][this.label] : this.data[this.currentPosition];
  }

  get showNextValue(): boolean {
    return this.data.length - 1 > this.currentPosition;
  }

  get showPreviewValue(): boolean {
    return this.currentPosition > 0;
  }

  constructor() {

    this.data = [];
    this.onCurrentValue = new EventEmitter<EmittedValue>();
    this.currentPosition = 0;
  }

  ngOnChanges( changes: SimpleChanges ): void {

    if ( changes.initialValue?.currentValue ) {
      const checkValue = ( value: any ) => value === this.initialValue;
      this.currentPosition = this.data.map( d => this.value ? d[this.value] : d ).findIndex( checkValue );
    }

  }

  changeValue( incrementer: number ): void {

    this.currentPosition += incrementer;

    const value = this.value ? this.data[this.currentPosition][this.value] : this.data[this.currentPosition];

    this.onCurrentValue.emit( {
      value,
      nextValue: incrementer > 0
    } );

  }

}
