import { EventEmitter, Injectable } from '@angular/core';
import { DateValidationType } from 'src/utils/enums';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  public numPiso$: EventEmitter<number> =  new EventEmitter<number>();
  public numPersonas$: EventEmitter<number> =  new EventEmitter<number>();
  public tipoValidacion$: EventEmitter<DateValidationType> = new EventEmitter<DateValidationType>();
}
