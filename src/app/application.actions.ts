import { createAction, props } from '@ngrx/store';

export const getPostalCode = createAction('[Applicaiton] Get zip', props<{ zipCode: string }>());
export const setPostalCode = createAction('[Applicaiton] Set postal code', props<{ postalCode: Object }>());

export const startPolling = createAction('[Application] Start polliing');
export const stopPolling = createAction('[Application] Stop polliing');
export const setDropdownStatus = createAction('[Application] Set dropdown status', props<{ dropdownStatus: boolean}>());
export const setRecord = createAction('[Application] Set dropdown status', props<{ record: object}>());