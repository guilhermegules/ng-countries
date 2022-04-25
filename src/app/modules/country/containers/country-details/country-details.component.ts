import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';

import { Country } from '../../models/country.model';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss'],
})
export class CountryDetailsComponent implements OnInit {
  public country!: Country;
  public borderCountries: string[] = [];

  constructor(
    private countryService: CountryService,
    private route: ActivatedRoute
  ) {}

  get currencies() {
    return Object.keys(this.country.currencies);
  }

  get languages() {
    return Object.values(this.country.languages);
  }

  public ngOnInit(): void {
    this.getCountryByName(this.route.snapshot.params['countryName'])
      .pipe(
        switchMap((country) => {
          this.country = country;

          if (!country?.borders?.length) return of([]);

          const borderCountries = country.borders.map((border) =>
            this.getCountryByName(border).pipe(
              map((country) => country.name.common)
            )
          );

          return forkJoin(borderCountries);
        })
      )
      .subscribe((borderCountries) => {
        this.borderCountries = borderCountries;
      });
  }

  public getCountryByName(countryName: string) {
    return this.countryService
      .getCountryByName(countryName)
      .pipe(map(([country]) => country));
  }
}
