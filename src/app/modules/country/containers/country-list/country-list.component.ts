import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, Observable, Subject, takeUntil } from 'rxjs';
import { RegionEnum } from '../../enums/region.enum';

import { Country } from '../../models/country.model';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss'],
})
export class CountryListComponent implements OnInit, OnDestroy {
  public countries$!: Observable<Country[]>;
  public regions: { value: string; label: string }[] = [];
  public form!: FormGroup;

  private destroyed$ = new Subject<void>();

  constructor(
    private countryService: CountryService,
    private fb: FormBuilder
  ) {}

  public ngOnInit(): void {
    this.initForm();

    this.countries$ = this.countryService.getAllCountries();

    this.regions = Object.values(RegionEnum).map((value) => ({
      value,
      label: value[0].toUpperCase() + value.slice(1),
    }));

    this.formFieldListeners();
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
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
      ?.valueChanges.pipe(debounceTime(500), takeUntil(this.destroyed$))
      .subscribe((search) => {
        this.countries$ = this.countryService.getCountryByName(search);
      });

    this.form
      .get('filter')
      ?.valueChanges.pipe(debounceTime(500), takeUntil(this.destroyed$))
      .subscribe((filter) => {
        this.countries$ = this.countryService.getCountriesByContinent(filter);
      });
  }
}
