import { createReducer, on } from '@ngrx/store';
import * as actions from './reservation.actions';

export interface State {
    floorNumber: number; 
    peopleNumber: number;
    reservationId: number;
}

export const initialState: State = {
   floorNumber: 0,
   peopleNumber: 0,
   reservationId: 0,

}

const _reservationReducer = createReducer(initialState,

    on(actions.setFloorNumber , (state, { floorNumber }) => ({ ...state, floorNumber: floorNumber})),
    on(actions.setPeopleNumber, (state, { peopleNumber }) => ({ ...state, peopleNumber: peopleNumber})),
    on(actions.setReservationId, (state, { reservationId }) => ({ ...state, reservationId: reservationId})),
    on(actions.setMeanOfTransport, (state, { meanOfTransportId }) => ({ ...state, meanOfTransportId: meanOfTransportId})),

);

export function reservationReducer(state: any, action: any) {
    return _reservationReducer(state, action);
}