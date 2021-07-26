import { createReducer, on } from '@ngrx/store';
import { setFloorNumber } from './reservation.actions';

export interface State {
    floorNumber: number; 
}

export const initialState: State = {
   floorNumber: 0,
}

const _reservationReducer = createReducer(initialState,

    on(setFloorNumber, (state, { floorNumber }) => ({ ...state, floorNumber: floorNumber})),

);

export function reservationReducer(state: any, action: any) {
    return _reservationReducer(state, action);
}