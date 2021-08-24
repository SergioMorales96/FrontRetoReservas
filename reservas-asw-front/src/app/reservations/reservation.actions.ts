import { createAction, props } from '@ngrx/store';
import { DatesReservation } from '../admin/interfaces/reservation';


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

export const setIsWorkstation = createAction(
    '[Reservations Component] setIsWorkstation',
    props<{ isWorkstation: boolean }>()    
);

export const setMeanOfTransport = createAction(
    '[Reservations Component] setMeanOfTransport',
    props<{ meanOfTransportId: number }>()    
);

export const setWorkstation = createAction(
    '[Reservations Component] setWorkstation',
    props<{ workstation: string }>()
);

export const setSelectedDate = createAction(
    '[Reservations Component] setSelectedDate',
    props<{ selectedDateSummary: Date | string}>()
);

export const setSymptoms = createAction(
    '[Reservations Component] setSymptoms',
    props<{ symptoms: string}>()

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
 
export const setReservationList= createAction(
    '[Reservations Component] setReservationList',
    props<{reservationList: DatesReservation[]}>()
)

export const setReservation= createAction(
    '[Reservations Component] setReservation',
    props<{reservation: DatesReservation | null}>()
)

export const setDates= createAction(
    '[Reservations Component] setReservation',
    props<{dates: DatesReservation[]}>()
)

export const setEditReservation = createAction(
    '[Reservations Component] setEditReservation',
    props<{isEditReservation: boolean }>()
)

export const setSteps = createAction(
    '[Reservations Component] setSteps',
    props<{ step: number}>()
)

export const setContinue = createAction(
    '[Reservations Component] setContinue',
    props<{ continuar : boolean}>()
)

export const setBlocked1= createAction(
    '[Reservations Component] setBlocked1',
    props<{blocked1: boolean }>()
)

export const setIsEdit= createAction(
    '[Reservations Component] setIsEdit',
    props<{isEdit: boolean }>()
)

export const setCapacity= createAction(
    '[Reservations Component] setCapacity',
    props<{capacity: string }>()
)

export const setIsEditReservation = createAction(
    '[Reservations Component] setIsEditReservation',
    props<{ isEditReservation: boolean }>()
)

export const setSidebarActive = createAction(
    '[Reservations Component] setSidebarActive',
    props<{ sidebarActive: boolean }>()
)

export const setIsBlockedReservation = createAction(
    '[Reservations Component] setIsBlockedReservation',
    props<{ isBlockedReservation: boolean }>()
)

