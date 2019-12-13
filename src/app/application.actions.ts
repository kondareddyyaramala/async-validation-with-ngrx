import { createAction, props } from '@ngrx/store';

export const getPostalCode = createAction('[Applicaiton] Get zip', props<{ zipCode: string }>());
export const setPostalCode = createAction('[Applicaiton] Set postal code', props<{ postalCode: Object }>());
