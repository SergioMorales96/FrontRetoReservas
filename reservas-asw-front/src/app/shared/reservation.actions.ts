import { createAction, props } from '@ngrx/store';

export const setFloorNumber = createAction(
    '[Reservations Component] setFloorNumber',
    props<{ floorNumber: number }>()    
);

export const setPeopleNumber = createAction(
    '[Reservations Component] setPeopleNumber',
    props<{ peopleNumber: number }>()    
);

export const setReservationId = createAction(
    '[Reservations Component] setReservationId',
    props<{ reservationId: number }>()    
);

export const setMeanOfTransport = createAction(
    '[Reservations Component] setMeanOfTransport',
    props<{ meanOfTransportId: number }>()    
);
export const setContinue = createAction(
    '[Reservations Component] setContinue',
    props<{ continuar: boolean }>()
);


export const setWorkstation = createAction(
    '[Reservations Component] setWorkstation',
    props<{ workstation: string }>()
);

export const setSelectedDate = createAction(
    '[Reservations Component] setSelectedDate',
    props<{ selectedDateSummary: Date}>()

);

export const setStartTime= createAction(
    '[Reservations Component] setStartTime',
    props<{ startTime: string}>()

);

export const setEndTime = createAction(
    '[Reservations Component] setEndTime',
    props<{ endTime: string}>()

);

export const setTimePeriod = createAction(
    '[Reservations Component] setTimePeriod',
    props<{ timePeriod : number}>()
);
export const setStartSlider = createAction(
    '[Reservations Component] setStartSlider',
    props<{ startSlider: number}>()
);
export const setEndSlider = createAction(
    '[Reservations Component] setEndSlider',
    props<{ endSlider: number}>()
);
