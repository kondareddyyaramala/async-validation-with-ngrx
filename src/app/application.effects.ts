import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { ApplicationService } from './applicaiton.service';
import * as ApplicationActions from './application.actions';


@Injectable()
export class ApplicationEffects {

  constructor(
    private actions$: Actions,
    private applicaitonService: ApplicationService
  ) { }

  validateZipCode$ = createEffect(() => this.actions$.pipe(
    ofType(ApplicationActions.getZip),
    switchMap(action =>
      this.applicaitonService.validatePostalCode(action.zipCode)
        .pipe(
          map(isValidZip => ApplicationActions.setIsValidZip({ isValidZip: isValidZip }))
        ))
  ));
}