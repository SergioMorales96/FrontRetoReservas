import { createReducer, on } from '@ngrx/store';
import * as actions from './reservation.actions';
import { DatesReservation } from '../admin/interfaces/reservation';
import { ReservationAction } from 'src/utils/enums';

export interface State {
    blocked1: boolean;
    floorNumber: number; 
    peopleNumber: number;
    reservationId: number;
    isWorkstation: boolean;
    workstation: string;
    meanOfTransport: number;
    symptoms:string;
    timePeriod: number;
    startTime: string;
    endTime: string;
    startSlider: number;
    endSlider: number;
    reservationList: DatesReservation[];
    reservation: DatesReservation | null;
    reservationAction: ReservationAction | number;
    selectedDateSummary: Date | string;
    step: number;
    dates: DatesReservation[];
    isEdit: boolean;

    sidebar: {
        isEditReservation: boolean,
        sidebarActive: boolean,
        isBlockedReservation: boolean
    }
}

export const initialState: State = {
   floorNumber: 18,
   peopleNumber: 1,
   reservationId: 0,
   workstation: "",
   isWorkstation: true,
   meanOfTransport: 0,
   symptoms:"",
   timePeriod: 0,
   startTime: "",
   endTime: "",
   startSlider: 0,
   endSlider: 0,
   reservationList: [],
   reservation: null ,
   reservationAction: 0,
   blocked1: false,
   selectedDateSummary: '',
   step: 1,
   dates: [],
   isEdit: false,

   sidebar: {
        isEditReservation: false,
        sidebarActive: true,
        isBlockedReservation: false
   },
}

const _reservationReducer = createReducer(initialState,
    on(actions.setFloorNumber , (state, { floorNumber }) => ({ ...state, floorNumber: floorNumber})),
    on(actions.setPeopleNumber, (state, { peopleNumber }) => ({ ...state, peopleNumber: peopleNumber})),
    on(actions.setReservationId, (state, { reservationId }) => ({ ...state, reservationId: reservationId})),
    on(actions.setMeanOfTransport, (state, { meanOfTransportId }) => ({ ...state, meanOfTransportId: meanOfTransportId})),
    on(actions.setWorkstation,(state, { workstation }) => ({ ...state, workstation: workstation})),
    on(actions.setIsWorkstation,(state, { isWorkstation }) => ({ ...state, isWorkstation: isWorkstation})),
    on(actions.setMeanOfTransport,(state, { meanOfTransportId }) => ({ ...state, meanOfTransport: meanOfTransportId})),
    on(actions.setSelectedDate,(state, { selectedDateSummary }) => ({ ...state, selectedDateSummary: selectedDateSummary})),
    on(actions.setSymptoms,(state, { symptoms }) => ({ ...state, symptoms: symptoms})),
    on(actions.setStartTime,(state, { startTime }) => ({ ...state, startTime: startTime})),
    on(actions.setEndTime,(state, { endTime }) => ({ ...state, endTime: endTime})),
    on(actions.setTimePeriod,(state, { timePeriod }) => ({ ...state, timePeriod: timePeriod})),

    on(actions.setStartSlider,(state, { startSlider }) => ({ ...state, startSlider: startSlider})),
    on(actions.setEndSlider,(state, { endSlider }) => ({ ...state, endSlider: endSlider})),

    on(actions.setReservation,(state,{reservation})=>({...state, reservation: reservation})),
    on(actions.setReservationList,(state,{reservationList})=>({...state, reservationList: reservationList})),
    on(actions.setBlocked1,(state,{blocked1})=>({...state, blocked1: blocked1})),
    on(actions.setSteps , (state, { step }) => ({...state, step:step})),
    on(actions.setDates , (state, { dates }) => ({...state, dates:dates})),

    on(actions.setIsEdit , (state, { isEdit }) => ({...state, isEdit:isEdit})),

    on(actions.setSidebar , (state, { sidebar }) => ({...state, sidebar: {...sidebar}})),
);

export function reservationReducer(state: any, action: any) {
    return _reservationReducer(state, action);
}