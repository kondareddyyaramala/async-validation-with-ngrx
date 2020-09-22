import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { create } from 'core-js/fn/object';
import { Subject, of, combineLatest} from 'rxjs';
import { map, switchMap, takeUntil, mergeMap, repeat, tap, delay } from 'rxjs/operators';
import { ApplicationService } from './applicaiton.service';
import * as ApplicationActions from './application.actions';
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
    ofType(ApplicationActions.getPostalCode),
    switchMap(action =>
      this.applicaitonService.validatePostalCode(action.zipCode)
        .pipe(
          map(postalCode => ApplicationActions.setPostalCode({ postalCode: postalCode || {} }))
        ))
  ));

  startPolling$ = createEffect(() => this.actions$.pipe(
    ofType(ApplicationActions.startPolling),
    // combineLatest(this.store.select(fromReducers.getDropdownStatus)),
    map(([action, dropdownStatus]) => {

      const fakeDelayedRequest = () => {
        // this is actual service call
        console.log('Making a service call .........');
        console.log('Dropdown status .... ', dropdownStatus);
        return of(new Date()).pipe(delay(1000));
      };

      of({}).pipe(
        takeUntil(this.destroy$$),
        mergeMap(_ => fakeDelayedRequest()),
        delay(3000),
        repeat()
      ).subscribe(resp => {
        console.log(resp);
        return this.store.dispatch(new ApplicationActions.setRecord({ record: (resp as Date).getTime() }));
      });
      )}
  ), { dispatch: false });


// stopPolling$ = createEffect() => this.actions$.pipe(
//   ofType(ApplicationActions.stopPolling),
//   mergeMap(action => {
//       // this.destroy$$.next();
//       // this.destroy$$.complete();
//     )}
// ),
//   { dispatch: false });
}