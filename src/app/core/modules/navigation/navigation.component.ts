import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ThemeEnum } from '../theme/enums/theme.enum';

import { ThemeService } from '../theme/services/theme.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit, OnDestroy {
  public themeKey!: string;

  private destroyed$ = new Subject<void>();

  constructor(private themeService: ThemeService) {}

  public ngOnInit(): void {
    this.themeService.theme$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(({ themeKey }) => {
        this.themeKey = themeKey;
      });
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public onChangeTheme() {
    this.themeService.setTheme(
      this.themeKey === ThemeEnum.LIGHT ? ThemeEnum.DARK : ThemeEnum.LIGHT
    );
  }
}
