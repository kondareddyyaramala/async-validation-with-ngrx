import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, map, filter, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  constructor(private http: HttpClient) { }

  fakeResponse = [
    {
      "postalCode": "60058"
    },
    {
      "postalCode": "60050"
    },
    {
      "postalCode": "60057"
    }
  ];

  validatePostalCode(input: string): Observable<Object> {
    return of(this.fakeResponse)
      .pipe(
        delay(1000),
        map(postalCodes => postalCodes.filter(p => +p.postalCode === +input)),
        tap(psCodes => console.log('In service ' + JSON.stringify(psCodes))),
        tap(psCodes => console.log('In service ' + !!psCodes.length)),
        map(postalCodes => postalCodes[0]),
      )
  }
}