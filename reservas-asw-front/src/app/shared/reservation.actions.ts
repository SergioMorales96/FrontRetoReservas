import { createAction, props } from '@ngrx/store';

export const setFloorNumber = createAction(
    '[Reservations Component] setFloorNumber',
    props<{ floorNumber: number }>()    
);

export const setPeopleNumber = createAction(
    '[Reservations Component] setPeopleNumber',
    props<{ peopleNumber: number }>()    
);

export const setContinue = createAction(
    '[Reservations Component] setContinue',
    props<{ continuar: boolean }>()
)


export const setWorkstation = createAction(
    '[Reservations Component] setWorkstation',
    props<{ workstation: string }>()
)


export const setMeanOfTransport = createAction(
    '[Reservations Component] setMeanOfTransport',
    props<{ meanOfTransport: number | null}>()
)