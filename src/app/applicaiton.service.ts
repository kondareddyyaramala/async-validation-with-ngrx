import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, map, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  constructor(private http: HttpClient) { }

  validatePostalCode(input: string): Observable<Object> {
    return this.http
      .get<Array<any>>('assets/postalCodes.json')
      .pipe(
        delay(1000),
        map(postalCodes => postalCodes.filter(p => p.postalCode === input)),
        map(postalCodes => !!postalCodes.length),
      )
  }
}