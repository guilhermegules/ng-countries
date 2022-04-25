import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Country } from '../../models/country.model';

@Component({
  selector: 'app-country-card',
  templateUrl: './country-card.component.html',
  styleUrls: ['./country-card.component.scss'],
})
export class CountryCardComponent {
  @Input()
  public country!: Country;

  @Output()
  public onClick = new EventEmitter<Country>();
}
