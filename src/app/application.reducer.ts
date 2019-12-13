import { createReducer, on, createSelector } from '@ngrx/store';
import * as ApplicaitonActions from './application.actions';


export interface State {
  postalCode: Object;
}

export const initialState: State = {
  postalCode: null
};

const _applicaitonReducer = createReducer(initialState,
  on(ApplicaitonActions.setPostalCode, (state, { postalCode }) => ({ ...state, postalCode }))
);

export function applicationReducer(state: State, action) {
  return _applicaitonReducer(state, action);
}

