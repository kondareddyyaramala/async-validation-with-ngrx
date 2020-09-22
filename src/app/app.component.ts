import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import * as fromReducers from './index.redcer';
import { Store } from '@ngrx/store';
import * as ApplicationActions from './application.actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public formGroup: FormGroup;


  constructor(
    private fb: FormBuilder, private store: Store<fromReducers.State>,) {
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      'zipCode': new FormControl('',
        [Validators.required, Validators.minLength(5)]),
      'zipCodeTwo': new FormControl('',
        [Validators.required, Validators.minLength(5)]),
    }, { updateOn: 'blur' }); // This makes sure it only updates the formControl values on 'blur'
    // If you need the formControl to update its value on every change then simply removing this altogether works
    //  as the default value for this is `change`
    // 'submit' also available
  }

  get zipCode() {
    return this.formGroup.get('zipCode');
  }

  get zipCodeTwo() {
    return this.formGroup.get('zipCodeTwo');
  }

  startPolling() {
    this.store.dispatch(new ApplicationActions.startPolling());
  }

  stopPolling() {
    this.store.dispatch(new ApplicationActions.stopPolling());
  }
}
