import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ThemeEnum } from '../enums/theme.enum';
import { Theme } from '../models/theme.model';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themes: { [themeName: string]: Theme } = {
    [ThemeEnum.LIGHT]: {
      backgroundColor: '#ffffff',
      color: '#111517',
      themeKey: ThemeEnum.LIGHT,
      bodyColor: '#fafafa',
    },
    [ThemeEnum.DARK]: {
      backgroundColor: '#2b3945',
      color: '#ffffff',
      themeKey: ThemeEnum.DARK,
      bodyColor: '#202c37',
    },
  };
  private theme = new BehaviorSubject<Theme>(this.themes[ThemeEnum.LIGHT]);

  get theme$() {
    return this.theme.asObservable();
  }

  public setTheme(theme: ThemeEnum) {
    if (!this.themes[theme])
      throw new Error(`Could not find theme with name ${theme}`);

    this.theme.next(this.themes[theme]);
  }
}
