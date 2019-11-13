import { createAction, props } from '@ngrx/store';

export const getZip = createAction('[Applicaiton] Get zip', props<{ zipCode: string }>());
export const setZip = createAction('[Applicaiton] Set zip', props<{ zipCode: Object}>());
