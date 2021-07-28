import { createReducer, on } from '@ngrx/store';
import * as actions from './reservation.actions';

export interface State {
    floorNumber: number; 
    peopleNumber: number;
    continuar: boolean;
}

export const initialState: State = {
   floorNumber: 0,
   peopleNumber: 0,
   continuar: false,
}

const _reservationReducer = createReducer(initialState,

    on(actions.setFloorNumber , (state, { floorNumber }) => ({ ...state, floorNumber: floorNumber})),
    on(actions.setPeopleNumber, (state, { peopleNumber }) => ({ ...state, peopleNumber: peopleNumber})),
    on(actions.setContinue,(state, { continuar }) => ({ ...state, continuar: continuar})),
);

export function reservationReducer(state: any, action: any) {
    return _reservationReducer(state, action);
}