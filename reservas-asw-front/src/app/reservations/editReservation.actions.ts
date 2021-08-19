import { createAction, props } from '@ngrx/store';

export const setIsEdit= createAction(
    '[Reservations Component] setIsEdit',
    props<{isEdit: boolean }>()
)