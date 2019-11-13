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
        [this.zipCodeValidator.bind(this)]
      ),
    }, { updateOn: 'blur' });
  }


  zipCodeValidator(control: AbstractControl) {
    this.store.dispatch(ApplicationActions.getZip({ zipCode: control.value }));
    return this.store.select(fromReducers.isZipCodeValid).pipe(
      take(2)
    ).pipe(
      tap(resp => console.log(JSON.stringify(resp))),
      map(v => !!v ? null : { 'zipCodeIsNotValid': true })
    );
  }

  get zipCode() {
    return this.formGroup.get('zipCode');
  }
}
