import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';
import { CountryDetailsComponent } from './country-details.component';
import { CountryService } from '../../services/country.service';
import { Country } from '../../models/country.model';

describe('CountryDetailsComponent', () => {
  let component: CountryDetailsComponent;
  let fixture: ComponentFixture<CountryDetailsComponent>;
  let countryService: CountryService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CountryDetailsComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { countryName: 'Brazil' } } },
        },
      ],
    }).compileComponents();
  });

  afterEach(() => {
    fixture.destroy();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryDetailsComponent);

    component = fixture.componentInstance;

    countryService = TestBed.inject(CountryService);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getters', () => {
    beforeEach(() => {
      component.country = {
        currencies: {
          name: 'Real',
          symbol: 'BRL',
        },
        languages: {
          ptBr: 'pt-BR',
        },
      } as any;
    });

    it('should return the currencies', () => {
      expect(component.currencies).toEqual(['name', 'symbol']);
    });

    it('should return the languages', () => {
      expect(component.languages).toEqual(['pt-BR']);
    });
  });

  describe('ngOnInit', () => {
    it('should set value on border countries and set fav icon', () => {
      component['favIcon'] = {} as HTMLLinkElement;
      const countriesMock: Country[] = [
        {
          name: {
            common: 'Brazil',
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
          borders: ['Argentina'],
          nativeName: '',
          numericCode: '',
          flags: {
            svg: 'flag.svg',
            png: 'flag.png',
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
      spyOn(countryService, 'getCountryByName').and.returnValue(of(countriesMock));

      component.ngOnInit();

      expect(component.borderCountries).toEqual(['Argentina']);
    });
  });

  describe('getCountryBasedOnBorderCountry', () => {
    it('should navigate to details page of the border country', () => {
      const countriesMock: Country[] = [
        {
          name: {
            common: 'Brazil',
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
            svg: 'flag.svg',
            png: 'flag.png',
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
      spyOn(countryService, 'getCountryByName').and.returnValue(of(countriesMock));

      component.getCountryBasedOnBorderCountry('argentina');

      expect(router.navigate).toHaveBeenCalledWith(['/details', 'argentina']);
    });
  });
});
