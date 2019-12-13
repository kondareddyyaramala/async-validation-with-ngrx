import { Component, Input } from '@angular/core';

import { Store } from '@ngrx/store';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { take, map, tap, shareReplay } from 'rxjs/operators';
import * as ApplicationActions from '../application.actions';
import * as fromReducers from '../index.redcer';

@Component({
  selector: 'postalcode',
  templateUrl: './postalcode.component.html',
  styleUrls: ['./postalcode.component.scss'],
})
export class PostalCodeComponent {
  @Input() formControl: FormControl;

  constructor(
    private store: Store<fromReducers.State>,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    this.formControl.setValidators([Validators.required, Validators.minLength(5)])
    this.formControl.setAsyncValidators(this.zipCodeValidator.bind(this));
  }


  zipCodeValidator(control: AbstractControl) {
    this.store.dispatch(ApplicationActions.getPostalCode({ zipCode: control.value }));
    return this.store.select(fromReducers.getPostalCode).pipe(
      take(2) // this gets a little tricky here
      // There may be a better way to handle this
      // What this does is, it makes sure it only recieves two values
      // The first one is the default value when we subscribe to this // obs first follwed by the second value when we update the value // in ngrx store. 
      // This also makes sure that the subscription gets completed
      // after recieving two values
    ).pipe(
      map(v => { 
        console.log(JSON.stringify('Resp ' + v));
        return v && v.postalCode ? null : { 'zipCodeIsNotValid': true };
      })
    );
  }
}
