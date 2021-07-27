import { EventEmitter, Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { DateValidationType } from 'src/utils/enums';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _floorId$: Subject<number>;
  private _numberPersons$: Subject<number>;
  private _validationType$: Subject<DateValidationType>;

  constructor() {
    this._floorId$ = new Subject<number>();
    this._numberPersons$ = new Subject<number>();
    this._validationType$ = new Subject<DateValidationType>();
  }

  get floorId$(): Observable<number> {
    return this._floorId$.asObservable();
  }

  set floorId( id: number ) {
    this._floorId$.next( id );
  }

  get numberPersons$(): Observable<number> {
    return this._numberPersons$.asObservable();
  }

  set numberPersons( id: number ) {
    this._numberPersons$.next( id );
  }

  get validationType$(): Observable<DateValidationType> {
    return this._validationType$.asObservable();
  }

  set validationType( type: DateValidationType ) {
    this._validationType$.next( type );
  }
}
