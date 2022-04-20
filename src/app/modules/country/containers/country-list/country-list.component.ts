import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RegionEnum } from '../../enums/region.enum';

import { Country } from '../../models/country.model';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss'],
})
export class CountryListComponent implements OnInit {
  public countries$!: Observable<Country[]>;
  public regions: { value: string; label: string }[] = [];

  constructor(private countryService: CountryService) {}

  public ngOnInit(): void {
    this.countries$ = this.countryService.getAllCountries();

    this.regions = Object.values(RegionEnum).map((value) => ({
      value,
      label: value[0].toUpperCase() + value.slice(1),
    }));
  }
}
