import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CountryDetailsComponent } from './containers/country-details/country-details.component';
import { CountryListComponent } from './containers/country-list/country-list.component';

const routes: Routes = [
  {
    path: '',
    component: CountryListComponent,
  },
  {
    path: 'details/:countryName',
    component: CountryDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountryRoutingModule {}
