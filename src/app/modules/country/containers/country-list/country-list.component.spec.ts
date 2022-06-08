import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CountryListComponent } from './country-list.component';
import { CountryService } from '../../services/country.service';
import { Country } from '../../models/country.model';
import { RegionEnum } from '../../enums/region.enum';

const countriesMock: Country[] = [
  {
    name: {
      common: '',
      official: '',
    },
    tld: [],
    alpha2Code: '',
    alpha3Code: '',
    callingCodes: [],
    capital: '',
    altSpellings: [],
    subregion: '',
    region: '',
    population: 0,
    latlng: [],
    demonym: '',
    area: 0,
    timezones: [],
    borders: [],
    nativeName: '',
    numericCode: '',
    flags: {
      svg: '',
      png: '',
    },
    currencies: {
      name: '',
      symbol: '',
    },
    languages: {},
    translations: {
      br: 'br',
      pt: 'pt',
      nl: 'nl',
      hr: 'hr',
      fa: 'fa',
      de: 'de',
      es: 'es',
      fr: 'fr',
      ja: 'ja',
      it: 'it',
      hu: 'hu',
    },
    flag: '',
    regionalBlocs: [],
    cioc: '',
    independent: true,
  },
];

describe('CountryListComponent', () => {
  let component: CountryListComponent;
  let fixture: ComponentFixture<CountryListComponent>;
  let countryService: CountryService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CountryListComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule, RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryListComponent);
    component = fixture.componentInstance;

    countryService = TestBed.inject(CountryService);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set value on countries array', () => {
      spyOn(countryService, 'getAllCountries').and.returnValue(of(countriesMock));

      component.ngOnInit();

      expect(component.countries).toEqual(countriesMock);
    });

    it('should set values on countries array when change search field', fakeAsync(() => {
      spyOn(countryService, 'getCountryByName').and.returnValue(of(countriesMock));

      component.ngOnInit();
      component.form.get('search')?.setValue('brazil');
      tick(600);

      expect(component.countries).toEqual(countriesMock);
    }));

    it('should set an empty list on countries when endpoint return error', fakeAsync(() => {
      spyOn(countryService, 'getCountryByName').and.returnValue(throwError(() => new Error('error')));

      component.ngOnInit();
      component.form.get('search')?.setValue('123');
      tick(600);

      expect(component.countries).toEqual([]);
    }));

    it('should call the service to get all the countries when search is a empty string', fakeAsync(() => {
      spyOn(countryService, 'getCountryByName').and.returnValue(throwError(() => new Error('error')));
      spyOn(countryService, 'getAllCountries').and.returnValue(of(countriesMock));

      component.ngOnInit();
      component.form.get('search')?.setValue('');
      tick(600);

      expect(component.countries).toEqual(countriesMock);
    }));

    it('should set values on countries array when change filter field', fakeAsync(() => {
      spyOn(countryService, 'getCountriesByRegion').and.returnValue(of(countriesMock));

      component.ngOnInit();
      component.form.get('filter')?.setValue(RegionEnum.AMERICAS);
      tick(600);

      expect(component.countries).toEqual(countriesMock);
    }));
  });

  describe('onCountryClick', () => {
    it('should navigate to details page', () => {
      spyOn(router, 'navigate').and.callFake(
        () =>
          new Promise(resolve => {
            resolve(true);
          }),
      );

      component.onCountryClick({ name: { common: 'brazil' } } as any);

      expect(router.navigate).toHaveBeenCalledWith(['details', 'brazil']);
    });
  });
});
