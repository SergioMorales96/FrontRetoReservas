import { createReducer, on } from '@ngrx/store';
import * as actions from './reservation.actions';

export interface State {
    floorNumber: number; 
    peopleNumber: number;
    continuar: boolean;
    //workstation: string;
    meanOfTransport: number | null;
}

export const initialState: State = {
   floorNumber: 0,
   peopleNumber: 0,
   continuar: false,
   //workstation: "",
   meanOfTransport: 0
}

const _reservationReducer = createReducer(initialState,

    on(actions.setFloorNumber , (state, { floorNumber }) => ({ ...state, floorNumber: floorNumber})),
    on(actions.setPeopleNumber, (state, { peopleNumber }) => ({ ...state, peopleNumber: peopleNumber})),
    on(actions.setContinue,(state, { continuar }) => ({ ...state, continuar: continuar})),
    //on(actions.setWorkstation,(state, { workstation }) => ({ ...state, workstation: workstation})),
    on(actions.setMeanOfTransport,(state, { meanOfTransport }) => ({ ...state, meanOfTransport: meanOfTransport}))
);

export function reservationReducer(state: any, action: any) {
    return _reservationReducer(state, action);
}