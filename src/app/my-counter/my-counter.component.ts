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
    }, { updateOn: 'blur' }); // This makes sure it only updates the formControl values on 'blur'
    // If you need the formControl to update its value on every change then simply removing this altogether works
    //  as the default value for this is `change`
  }


  zipCodeValidator(control: AbstractControl) {
    this.store.dispatch(ApplicationActions.getZip({ zipCode: control.value }));
    return this.store.select(fromReducers.isZipCodeValid).pipe(
      take(2) // this gets a little tricky here
      // couldn't find a better way
      // What this does is, it makes sure it only recieves two values
      // The first one is the default value when we subscribe to this // obs first follwed by the second value when we update the value // in ngrx store. 
      // This also makes sure that the subscription gets completed
      // after recieving two values
    ).pipe(
      tap(resp => console.log(JSON.stringify(resp))),
      map(v => !!v ? null : { 'zipCodeIsNotValid': true })
    );
  }

  get zipCode() {
    return this.formGroup.get('zipCode');
  }
}
