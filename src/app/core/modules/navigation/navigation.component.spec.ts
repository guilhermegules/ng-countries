import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemeEnum } from '../theme/enums/theme.enum';
import { ThemeService } from '../theme/services/theme.service';

import { NavigationComponent } from './navigation.component';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let themeService: ThemeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavigationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;

    themeService = TestBed.inject(ThemeService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onChangeTheme', () => {
    it('should call theme service with light key', () => {
      spyOn(themeService, 'setTheme');

      component.themeKey = ThemeEnum.DARK;

      component.onChangeTheme();

      expect(themeService.setTheme).toHaveBeenCalledWith(ThemeEnum.LIGHT);
    });
    it('should call theme service with dark key', () => {
      spyOn(themeService, 'setTheme');

      component.themeKey = ThemeEnum.LIGHT;

      component.onChangeTheme();

      expect(themeService.setTheme).toHaveBeenCalledWith(ThemeEnum.DARK);
    });
  });
});
