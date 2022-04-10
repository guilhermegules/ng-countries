import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation.component';

@NgModule({
  declarations: [NavigationComponent],
  imports: [CommonModule],
  exports: [NavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NavigationModule {}
