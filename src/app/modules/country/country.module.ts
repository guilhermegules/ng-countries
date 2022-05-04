import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountryRoutingModule } from './country-routing.module';
import { CountryListComponent } from './containers/country-list/country-list.component';
import { CountryDetailsComponent } from './containers/country-details/country-details.component';
import { CountryCardComponent } from './components/country-card/country-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderModule } from '../../shared/modules/loader/loader.module';
import { ThemeModule } from '../../core/modules/theme/theme.module';

@NgModule({
  declarations: [
    CountryListComponent,
    CountryDetailsComponent,
    CountryCardComponent,
  ],
  imports: [
    CommonModule,
    CountryRoutingModule,
    ReactiveFormsModule,
    LoaderModule,
    ThemeModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CountryModule {}
