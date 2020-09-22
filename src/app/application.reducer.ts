import { createReducer, on, createSelector, State } from '@ngrx/store';
import { setDropdownStatus, setPostalCode, setRecord } from './application.actions';


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
  on(setPostalCode, (state, { postalCode }) => ({ ...state, postalCode })),
  on(setDropdownStatus, (state, { dropdownStatus }) => ({ ...state, dropdownStatus })),
  on(setRecord, (state, { record }) => ({ ...state, record })),
);

export function applicationReducer(state: State, action) {
  return _applicaitonReducer(state, action);
}

