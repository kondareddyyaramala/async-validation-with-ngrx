import { createReducer, on } from '@ngrx/store';
import * as ApplicaitonActions from './application.actions';


export interface State {
  shipToZip: Object;
}

export const initialState: State = {
  shipToZip: null
};

const _applicaitonReducer = createReducer(initialState,
  on(ApplicaitonActions.setZip, (state, { zipCode }) => Object.assign(state, { shipToZip: zipCode}))
);

export function applicationReducer(state: State, action) {
  return _applicaitonReducer(state, action);
}


/*
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://github.com/ngrx/platform
*/