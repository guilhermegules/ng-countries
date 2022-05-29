import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegionEnum } from '../enums/region.enum';
import { Country } from '../models/country.model';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private readonly API_URL = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) {}

  public getAllCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.API_URL}/all`);
  }

  public getCountryByName(countryName: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.API_URL}/name/${countryName.toLocaleLowerCase()}`);
  }

  public getCountriesByRegion(region: RegionEnum): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.API_URL}/region/${region}`);
  }

  public getCountryByCode(code: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.API_URL}/alpha/${code}`);
  }

  public getCountryByCodes(codes: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.API_URL}/alpha?codes=${codes}`);
  }
}
