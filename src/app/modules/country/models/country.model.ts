export interface Country {
  name: {
    common: string;
    official: string;
  };
  tld: Array<string>;
  alpha2Code: string;
  alpha3Code: string;
  callingCodes: Array<string>;
  capital: string;
  altSpellings: Array<string>;
  subregion: string;
  region: string;
  population: number;
  latlng: Array<number>;
  demonym: string;
  area: number;
  timezones: Array<string>;
  borders: Array<string>;
  nativeName: string;
  numericCode: string;
  flags: CountryFlagImageType;
  currencies: Record<string, { name: string; symbol: string }>;
  languages: Record<string, string>;
  translations: CountryTranslation;
  flag: string;
  regionalBlocs: Array<CountryRegionalBlocs>;
  cioc: string;
  independent: boolean;
}

export interface CountryRegionalBlocs {
  acronym: string;
  name: string;
}

export interface CountryTranslation {
  br: string;
  pt: string;
  nl: string;
  hr: string;
  fa: string;
  de: string;
  es: string;
  fr: string;
  ja: string;
  it: string;
  hu: string;
}

export interface CountryFlagImageType {
  svg: string;
  png: string;
}
