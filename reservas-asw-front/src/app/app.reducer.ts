import { ActionReducerMap } from '@ngrx/store';
import * as reservation from './reservations/reservation.reducer';
import * as editReservation from './reservations/editReservation.reducer';


export interface AppState {
   reservation: reservation.State
   editReservation: editReservation.State
}



export const appReducers: ActionReducerMap<AppState> = {
   reservation: reservation.reservationReducer,
   editReservation: editReservation.reservationEditReducer
}