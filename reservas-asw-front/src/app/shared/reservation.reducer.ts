import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import * as actions from './reservation.actions';

export interface State {
    floorNumber: number; 
    peopleNumber: number;
    reservationId: number;
    workstation: string;
    meanOfTransport: number;
    selectedDateSummary: Date | string;
    symptoms: string;
    step: number;
    timePeriod: number;
    startTime: string;
    endTime : string;
}

export const initialState: State = {
   floorNumber: 0,
   peopleNumber: 0,
   reservationId: 0,
   workstation: "",
   meanOfTransport: 0,
   selectedDateSummary: '',
   symptoms:"",
   step: 0,
   timePeriod: 0,
   startTime:"",
   endTime:"",
}

const _reservationReducer = createReducer(initialState,

    on(actions.setFloorNumber , (state, { floorNumber }) => ({ ...state, floorNumber: floorNumber})),
    on(actions.setPeopleNumber, (state, { peopleNumber }) => ({ ...state, peopleNumber: peopleNumber})),
    on(actions.setReservationId, (state, { reservationId }) => ({ ...state, reservationId: reservationId})),
    on(actions.setMeanOfTransport, (state, { meanOfTransportId }) => ({ ...state, meanOfTransportId: meanOfTransportId})),
    on(actions.setWorkstation,(state, { workstation }) => ({ ...state, workstation: workstation})),
    on(actions.setMeanOfTransport,(state, { meanOfTransportId }) => ({ ...state, meanOfTransport: meanOfTransportId})),
    on(actions.setSelectedDate,(state, { selectedDateSummary }) => ({ ...state, selectedDateSummary: selectedDateSummary})),
    on(actions.setSymptoms,(state, { symptoms }) => ({ ...state, symptoms: symptoms})),
    on(actions.setSteps , (state, { step }) => ({...state, step:step})),
    on(actions.setTimePeriod,(state, { timePeriod }) => ({ ...state, timePeriod: timePeriod})),
    on(actions.setStartTime,(state, { startTime }) => ({ ...state, startTime: startTime})),
    on(actions.setEndTime,(state, { endTime }) => ({ ...state, endTime: endTime}))
);

export function reservationReducer(state: any, action: any) {
    return _reservationReducer(state, action);
}