import { createReducer, on } from '@ngrx/store';
import * as actions from './reservation.actions';

export interface State {
    floorNumber: number; 
    peopleNumber: number;
    reservationId: number;
    continuar: boolean;
    workstation: string;
    meanOfTransport: number;
    selectedDateSummary: Date;
    symptoms:string;
    timePeriod: number;
    startTime: string;
    endTime: string;
    startSlider: number;
    endSlider: number;
}

export const initialState: State = {
   floorNumber: 0,
   peopleNumber: 0,
   reservationId: 0,
   continuar: false,
   workstation: "",
   meanOfTransport: 0,
   selectedDateSummary: new Date,
   symptoms:"",
   timePeriod: 0,
   startTime: "",
   endTime: "",
   startSlider: 0,
    endSlider: 0,
}

const _reservationReducer = createReducer(initialState,

    on(actions.setFloorNumber , (state, { floorNumber }) => ({ ...state, floorNumber: floorNumber})),
    on(actions.setPeopleNumber, (state, { peopleNumber }) => ({ ...state, peopleNumber: peopleNumber})),
    on(actions.setReservationId, (state, { reservationId }) => ({ ...state, reservationId: reservationId})),
    on(actions.setMeanOfTransport, (state, { meanOfTransportId }) => ({ ...state, meanOfTransportId: meanOfTransportId})),
    on(actions.setContinue,(state, { continuar }) => ({ ...state, continuar: continuar})),
    on(actions.setWorkstation,(state, { workstation }) => ({ ...state, workstation: workstation})),
    on(actions.setMeanOfTransport,(state, { meanOfTransportId }) => ({ ...state, meanOfTransport: meanOfTransportId})),
    on(actions.setSelectedDate,(state, { selectedDateSummary }) => ({ ...state, selectedDateSummary: selectedDateSummary})),
    on(actions.setSymptoms,(state, { symptoms }) => ({ ...state, symptoms: symptoms})),
    on(actions.setStartTime,(state, { startTime }) => ({ ...state, startTime: startTime})),
    on(actions.setEndTime,(state, { endTime }) => ({ ...state, endTime: endTime})),
    on(actions.setTimePeriod,(state, { timePeriod }) => ({ ...state, timePeriod: timePeriod})),

    on(actions.setStartSlider,(state, { startSlider }) => ({ ...state, startSlider: startSlider})),
    on(actions.setEndSlider,(state, { endSlider }) => ({ ...state, endSlider: endSlider}))



);

export function reservationReducer(state: any, action: any) {
    return _reservationReducer(state, action);
}