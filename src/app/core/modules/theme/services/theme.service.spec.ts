import { TestBed } from '@angular/core/testing';
import { ThemeEnum } from '../enums/theme.enum';

import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setTheme', () => {
    it('should throw an error when the passed theme is not valid', () => {
      expect(service.setTheme('test' as any)).toThrowError('`Could not find theme with name test');
    });
    it('should set the light value on theme subject', done => {
      service.setTheme(ThemeEnum.LIGHT);

      service.theme$.subscribe(theme => {
        expect(theme).toEqual({
          backgroundColor: '#ffffff',
          color: '#111517',
          themeKey: ThemeEnum.LIGHT,
          bodyColor: '#fafafa',
        });
        done();
      });
    });
  });
});
