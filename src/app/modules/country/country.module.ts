import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountryRoutingModule } from './country-routing.module';
import { CountryListComponent } from './containers/country-list/country-list.component';
import { CountryDetailsComponent } from './containers/country-details/country-details.component';
import { CountryCardComponent } from './components/country-card/country-card.component';


@NgModule({
  declarations: [
    CountryListComponent,
    CountryDetailsComponent,
    CountryCardComponent
  ],
  imports: [
    CommonModule,
    CountryRoutingModule
  ]
})
export class CountryModule { }
