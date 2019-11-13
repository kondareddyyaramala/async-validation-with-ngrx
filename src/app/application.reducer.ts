import { createReducer, on, createSelector } from '@ngrx/store';
import * as ApplicaitonActions from './application.actions';


export interface State {
  isValidZip: boolean;
}

export const initialState: State = {
  isValidZip: false
};

const _applicaitonReducer = createReducer(initialState,
  on(ApplicaitonActions.setIsValidZip, (state, { isValidZip }) => ({ ...state, isValidZip }))
);

export function applicationReducer(state: State, action) {
  return _applicaitonReducer(state, action);
}


export const isZipCodeValid = (state: State) => state.isValidZip;

