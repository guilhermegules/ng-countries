import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountryRoutingModule } from './country-routing.module';
import { CountryListComponent } from './containers/country-list/country-list.component';
import { CountryDetailsComponent } from './containers/country-details/country-details.component';


@NgModule({
  declarations: [
    CountryListComponent,
    CountryDetailsComponent
  ],
  imports: [
    CommonModule,
    CountryRoutingModule
  ]
})
export class CountryModule { }
