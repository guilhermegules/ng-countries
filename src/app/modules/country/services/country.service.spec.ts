import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RegionEnum } from '../enums/region.enum';

import { CountryService } from './country.service';

describe('CountryService', () => {
  let service: CountryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CountryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all countries', () => {
    service.getAllCountries().subscribe();

    const { request } = httpMock.expectOne('https://restcountries.com/v3.1/all');

    expect(request.method).toBe('GET');
  });

  it('should get country by name', () => {
    service.getCountryByName('brazil').subscribe();

    const { request } = httpMock.expectOne('https://restcountries.com/v3.1/name/brazil');

    expect(request.method).toBe('GET');
  });

  it('should get countries by region', () => {
    service.getCountriesByRegion(RegionEnum.AFRICA).subscribe();

    const { request } = httpMock.expectOne('https://restcountries.com/v3.1/region/africa');

    expect(request.method).toBe('GET');
  });
});
