import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  finalize,
  forkJoin,
  map,
  Observable,
  of,
  Subject,
  switchMap,
} from 'rxjs';

import { Country } from '../../models/country.model';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss'],
})
export class CountryDetailsComponent implements OnInit, OnDestroy {
  public country!: Country;
  public borderCountries: string[] = [];
  public loading = true;

  private destroyed$ = new Subject<void>();

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
    this.getCountryByNameHandler(this.route.snapshot.params['countryName']);
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public getCountryByNameHandler(countryName: string, shouldSetLoader = false) {
    if (shouldSetLoader) {
      this.loading = true;
    }

    this.getCountryByName(countryName)
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
    return this.countryService.getCountryByName(countryName).pipe(
      map(([country]) => country),
      finalize(() => {
        this.loading = false;
      })
    );
  }
}
