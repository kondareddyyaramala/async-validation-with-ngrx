import { createReducer, on, createSelector, State } from '@ngrx/store';
import * as ApplicaitonActions from './application.actions';


export interface State {
  postalCode: Object;
  dropdownStatus: boolean;
  record: object;
}

export const initialState: State = {
  postalCode: null,
  dropdownStatus: null,
  record: null
};

const _applicaitonReducer = createReducer(initialState,
  on(ApplicaitonActions.setPostalCode, (state, { postalCode }) => ({ ...state, postalCode })),
  on(ApplicaitonActions.setDropdownStatus, (state, { dropdownStatus }) => ({ ...state, dropdownStatus })),
  on(ApplicaitonActions.setRecord, (state, { record }) => ({ ...state, record })),
);

export function applicationReducer(state: State, action) {
  return _applicaitonReducer(state, action);
}

