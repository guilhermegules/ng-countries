import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../models/country.model';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private readonly API_URL = 'https://restcountries.com/v2';

  constructor(private http: HttpClient) {}

  public getAllCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.API_URL}/all`);
  }
}
