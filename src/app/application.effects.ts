import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ApplicationService } from './application.service';
import * as ApplcationActions from './application.actions';

 
@Injectable()
export class ApplicationEffects {
 
  validateZipCode$ = createEffect(() => this.actions$.pipe(
    ofType(ApplcationActions.get),
    mergeMap(() => this.applicaitonService.validatePostalCode()
      .pipe(
        map(movies => ({ type: '[Movies API] Movies Loaded Success', payload: movies })),
      ))
    )
  );
 
  constructor(
    private actions$: Actions,
    private applicaitonService: ApplicationService
  ) {}
}