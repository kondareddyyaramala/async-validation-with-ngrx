import { createAction, props } from '@ngrx/store';

export const getZip = createAction('[Applicaiton] Get zip', props<{ zipCode: string }>());
export const setIsValidZip = createAction('[Applicaiton] Set is valid zip', props<{ isValidZip: boolean }>());
