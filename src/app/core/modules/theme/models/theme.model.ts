import { ThemeEnum } from '../enums/theme.enum';

export interface Theme {
  backgroundColor: string;
  color: string;
  themeKey: ThemeEnum;
  bodyColor: string;
}
