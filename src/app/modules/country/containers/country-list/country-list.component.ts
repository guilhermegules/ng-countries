import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, debounceTime, EMPTY, finalize, of, Subject, switchMap, take, takeUntil, tap } from 'rxjs';
import { RegionEnum } from '../../enums/region.enum';

import { Country } from '../../models/country.model';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss'],
})
export class CountryListComponent implements OnInit, OnDestroy {
  public countries!: Country[];

  public regions: { value: string; label: string }[] = [];

  public form!: FormGroup;

  public loading = true;

  private destroyed$ = new Subject<void>();

  constructor(private countryService: CountryService, private fb: FormBuilder, private router: Router) {}

  public ngOnInit(): void {
    this.initForm();

    this.getAllCountries().subscribe(countries => {
      this.countries = countries;
    });

    this.regions = Object.values(RegionEnum).map(value => ({
      value,
      label: `${value[0].toUpperCase()}${value.slice(1)}`,
    }));

    this.formFieldListeners();
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public onCountryClick(country: Country) {
    this.router.navigate(['details', country.name.common]);
  }

  private initForm() {
    this.form = this.fb.group({
      search: null,
      filter: null,
    });
  }

  private formFieldListeners() {
    this.form
      .get('search')
      ?.valueChanges.pipe(
        debounceTime(500),
        tap(() => {
          this.loading = true;
        }),
        switchMap(search => {
          console.log(search);
          return this.countryService
            .getCountryByName(search)
            .pipe(catchError(() => (search === '' ? this.getAllCountries() : of([]))));
        }),
        takeUntil(this.destroyed$),
      )
      .subscribe(countries => {
        console.log(countries);
        this.countries = countries;
        this.loading = false;
      });

    this.form
      .get('filter')
      ?.valueChanges.pipe(
        debounceTime(500),
        tap(() => {
          this.loading = true;
        }),
        switchMap(region =>
          this.countryService.getCountriesByRegion(region).pipe(
            finalize(() => {
              this.loading = false;
            }),
          ),
        ),
        takeUntil(this.destroyed$),
      )
      .subscribe(countries => {
        this.countries = countries;
      });
  }

  private getAllCountries() {
    return this.countryService.getAllCountries().pipe(
      finalize(() => {
        this.loading = false;
      }),
      take(1),
    );
  }
}
