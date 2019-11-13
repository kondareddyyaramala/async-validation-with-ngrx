import { Component } from '@angular/core';

import { Store } from '@ngrx/store';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';
import * as ApplicationActions from '../application.actions';
import * as fromReducers from '../index.redcer';

@Component({
  selector: 'app-my-counter',
  templateUrl: './my-counter.component.html',
  styleUrls: ['./my-counter.component.scss'],
})
export class MyCounterComponent {
  isValidZip$: Observable<boolean>;

  public formGroup: FormGroup;

  constructor(
    private store: Store<fromReducers.State>,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    this.isValidZip$ = this.store.select(fromReducers.isZipCodeValid);
    this.formGroup = this.fb.group({
      'zipCode': new FormControl('',
        [Validators.required, Validators.minLength(5)],
        // I have validated this in my local that the async validators only run if the 
        // Sync validators are passed which is good
        [this.zipCodeValidator.bind(this)]
      ),
    }, { updateOn: 'blur' }); // Make sure it only updates the formControls on blur
    // If you need you formControl need to update on every change then we remove this
    // altogether as the default value for this is `change`
  }


  zipCodeValidator(control: AbstractControl) {
    this.store.dispatch(ApplicationActions.getZip({ zipCode: control.value }));
    return this.store.select(fromReducers.isZipCodeValid).pipe(
      take(2) // this is a little ticky couldn't find a better way
      // What this does is it make sures it onlt recieves two values
      // one is the defaultv value when we subscribe to this obs and other value is when
      // it gets updated in the store. This was we don't have to clean up the subscriptions
      //as it would automatically completes upon recieving two values
    ).pipe(
      tap(resp => console.log(JSON.stringify(resp))),
      map(v => !!v ? null : { 'zipCodeIsNotValid': true })
    );
  }

  get zipCode() {
    return this.formGroup.get('zipCode');
  }
}
