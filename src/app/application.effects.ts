import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { create } from 'core-js/fn/object';
import { Subject, of, combineLatest } from 'rxjs';
import { map, switchMap, takeUntil, mergeMap, repeat, tap, delay } from 'rxjs/operators';
import { ApplicationService } from './applicaiton.service';
import { getPostalCode, startPolling, setPostalCode, stopPolling } from './application.actions';
import * as fromReducers from './index.redcer';
import { Store } from '@ngrx/store';

@Injectable()
export class ApplicationEffects {

  private destroy$$: Subject = new Subject();

  constructor(
    private actions$: Actions,
    private applicaitonService: ApplicationService,
    private store: Store<fromReducers.State>,
  ) { }

  validateZipCode$ = createEffect(() => this.actions$.pipe(
    ofType(getPostalCode),
    switchMap(action =>
      this.applicaitonService.validatePostalCode(action.zipCode)
        .pipe(
          map(postalCode => setPostalCode({ postalCode: postalCode || {} }))
        ))
  ));

  stopPolling$ = createEffect(() => this.actions$.pipe(
    ofType(stopPolling),
    map(action => {
      this.destroy$$.next();
      this.destroy$$.complete();
    })
  ), { dispatch: false });

  startPolling$ = createEffect(() => this.actions$.pipe(
    ofType(startPolling),
    map(([action, dropdownStatus]) => {

      const fakeDelayedRequest = () => {
        // this is actual service call
        console.log('Making a service call .........');
        return of(new Date()).pipe(delay(1000));
      };

      const pollingObservavle = of({}).pipe(
        mergeMap(_ => fakeDelayedRequest()),
        delay(2000),
        repeat()
      )

      combineLatest(this.store.select(fromReducers.getDropdownStatus), pollingObservavle)
        .pipe(
          takeUntil(this.destroy$$)
        )
        .subscribe(([dropdownStatus, serviceResponse]) => {
          console.log('In effect : dropdownstatus ... ', dropdownStatus);
          console.log('In effect : serviceResponse ... ', serviceResponse);
        })
      )}
  ), { dispatch: false });

}