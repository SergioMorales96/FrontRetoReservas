import { createAction, props } from '@ngrx/store';
import { DatesReservation } from '../admin/interfaces/reservation';
import { ReservationAction } from '../../utils/enums';

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
)


export const setWorkstation = createAction(
    '[Reservations Component] setWorkstation',
    props<{ workstation: string }>()
)

export const setSelectedDate = createAction(
    '[Reservations Component] setSelectedDate',
    props<{ selectedDateSummary: Date}>()

)
 
export const setReservationList= createAction(
    '[Reservations Component] setReservationList',
    props<{reservationList: DatesReservation[]}>()
)

export const setReservation= createAction(
    '[Reservations Component] setReservation',
    props<{reservation: DatesReservation | null}>()
)
export const setEditReservation = createAction(
    '[Reservations Component] setEditReservation',
    props<{isEditReservation: boolean }>()
)
export const setdeleteReservation= createAction(
    '[Reservations Component] deleteReservation',
    props<{deleteReservation: DatesReservation}>()
)


