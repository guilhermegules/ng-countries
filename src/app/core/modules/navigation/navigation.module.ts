import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigationComponent } from './navigation.component';
import { ThemeModule } from '../theme/theme.module';

@NgModule({
  declarations: [NavigationComponent],
  imports: [CommonModule, ThemeModule],
  exports: [NavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NavigationModule {}
