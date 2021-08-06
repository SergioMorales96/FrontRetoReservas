import { ActionReducerMap } from '@ngrx/store';
import * as reservation from './reservations/reservation.reducer';


export interface AppState {
   reservation: reservation.State
}



export const appReducers: ActionReducerMap<AppState> = {
   reservation: reservation.reservationReducer,
}