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