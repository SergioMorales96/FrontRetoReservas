import { createReducer, on } from '@ngrx/store';
import * as actions from './editReservation.actions';

export interface State {
    isEdit: boolean;
}

export const initialState: State = {
    isEdit: false
}


const _reservationEditReducer = createReducer(initialState,

    on(actions.setIsEdit , (state, { isEdit }) => ({...state, isEdit:isEdit})),

);

export function reservationEditReducer(state: any, action: any) {
    return _reservationEditReducer(state, action);
}
