import {Observable} from 'rxjs';

import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {PlaceDetails} from './model/place-details.model';
import {PlaceSummary} from './model/place-summary.model';
import {CountrySummary} from './model/country-summary.model';
import {GeoResponse} from './model/geo-response.model';
import {NearLocationRequest} from './request/near-location-request.model';
import {RegionSummary} from './model/region-summary.model';

import {GeoDbConfig} from './model/geodb-config.model';
import {CountryDetails} from './model/country-details.model';
import {RegionDetails} from './model/region-details.model';
import {Currency} from './model/currency.model';
import {Locale} from './model/locale.model';
import {FindAdminDivisionsRequest} from './request/find-admin-divisions-request.model';
import {FindPlacesRequest} from './request/find-places-request.model';
import {FindCollectionRequest} from './request/find-collection-request.model';
import {FindCountriesRequest} from './request/find-countries-request.model';
import {FindCurrenciesRequest} from './request/find-currencies-request.model';
import {FindRegionsRequest} from './request/find-regions-request.model';
import {FindRegionCitiesRequest} from './request/find-region-cities-request.model';
import {FindPlacesNearPlaceRequest} from './request/find-places-near-place-request.model';
import {TimeZone} from './model/time-zone.model';
import {GetPlaceDistanceRequest} from './request/get-place-distance-request.model';
import {FindPlacesNearLocationRequest} from './request/find-places-near-location-request.model';
import {GetPlaceDetailsRequest} from './request/get-place-details-request.model';
import {GetCountryDetailsRequest} from './request/get-country-details-request.model';
import {GetRegionDetailsRequest} from './request/get-region-details-request.model';
import {Language} from './model/language.model';

@Injectable()
export class GeoDbService {
  private adminDivisionsEndpoint: string;
  private countriesEndpoint: string;
  private currenciesEndpoint: string;
  private languagesEndpoint: string;
  private localesEndpoint: string;
  private placesEndpoint: string;
  private timeZonesEndpoint: string;

  constructor(private httpClient: HttpClient, private config: GeoDbConfig) {

    this.adminDivisionsEndpoint = config.serviceUri + 'v1/geo/adminDivisions';
    this.countriesEndpoint = config.serviceUri + '/v1/geo/countries';
    this.currenciesEndpoint = config.serviceUri + '/v1/locale/currencies';
    this.languagesEndpoint = config.serviceUri + '/v1/locale/languages';
    this.localesEndpoint = config.serviceUri + '/v1/locale/locales';
    this.placesEndpoint = config.serviceUri + '/v1/geo/cities';
    this.timeZonesEndpoint = config.serviceUri + '/v1/locale/timezones';
  }

  private static buildPagingParams(request: FindCollectionRequest): HttpParams {

    return new HttpParams()
      .set('offset', '' + request.offset)
      .set('limit', '' + request.limit)
      .set('hateoasMode', 'false');
  }

  private static toLocationString(nearLocation: NearLocationRequest): string {

    let locationString = '';

    if (nearLocation.latitude > 0) {
      locationString += '+';
    }

    locationString += nearLocation.latitude;

    if (nearLocation.longitude > 0) {
      locationString += '+';
    }

    locationString += nearLocation.longitude;

    return locationString;
  }

  findAdminDivisions(request: FindAdminDivisionsRequest): Observable<GeoResponse<PlaceSummary[]>> {

    let params: HttpParams = GeoDbService.buildPagingParams(request);

    if (request.countryIds) {
      params = params.set('countryIds', request.countryIds.join(','));
    }

    if (request.excludedCountryIds) {
      params = params.set('excludedCountryIds', request.excludedCountryIds.join(','));
    }

    if (request.namePrefix) {
      params = params.set('namePrefix', request.namePrefix);
    }

    if (request.minPopulation) {
      params = params.set('minPopulation', '' + request.minPopulation);
    }

    if (request.timeZoneIds) {
      params = params.set('timeZoneIds', request.timeZoneIds.join(','));
    }

    if (request.asciiMode) {
      params = params.set('asciiMode', '' + request.asciiMode);
    }

    if (request.languageCode) {
      params = params.set('languageCode', request.languageCode);
    }

    if (request.sortDirectives) {
      params = params.set('sort', request.sortDirectives.join(','));
    }

    if (request.includeDeleted) {
      params = params.set('includeDeleted', request.includeDeleted);
    }

    return this.httpClient.get<GeoResponse<PlaceSummary[]>>(
      this.adminDivisionsEndpoint,
      {
        params: params
      }
    );
  }

  findPlace(request: GetPlaceDetailsRequest): Observable<GeoResponse<PlaceDetails>> {

    const endpoint = this.buildPlaceEndpoint(request.placeId);

    let params: HttpParams = new HttpParams();

    if (request.asciiMode) {
      params = params.set('asciiMode', '' + request.asciiMode);
    }

    if (request.languageCode) {
      params = params.set('languageCode', request.languageCode);
    }

    return this.httpClient.get<GeoResponse<PlaceDetails>>(
      endpoint,
      {
        params: params
      }
    );
  }

  findPlaces(request: FindPlacesRequest): Observable<GeoResponse<PlaceSummary[]>> {

    let params: HttpParams = GeoDbService.buildPagingParams(request);

    if (request.countryIds) {
      params = params.set('countryIds', request.countryIds.join(','));
    }

    if (request.excludedCountryIds) {
      params = params.set('excludedCountryIds', request.excludedCountryIds.join(','));
    }

    if (request.namePrefix) {
      params = params.set('namePrefix', request.namePrefix);
    }

    if (request.minPopulation) {
      params = params.set('minPopulation', '' + request.minPopulation);
    }

    if (request.timeZoneIds) {
      params = params.set('timeZoneIds', request.timeZoneIds.join(','));
    }

    if (request.types) {
      params = params.set('types', request.types.join(','));
    }

    if (request.asciiMode) {
      params = params.set('asciiMode', '' + request.asciiMode);
    }

    if (request.languageCode) {
      params = params.set('languageCode', request.languageCode);
    }

    if (request.sortDirectives) {
      params = params.set('sort', request.sortDirectives.join(','));
    }

    if (request.includeDeleted) {
      params = params.set('includeDeleted', request.includeDeleted);
    }

    return this.httpClient.get<GeoResponse<PlaceSummary[]>>(
      this.placesEndpoint,
      {
        params: params
      }
    );
  }

  findPlacesNearLocation(request: FindPlacesNearLocationRequest): Observable<GeoResponse<PlaceSummary[]>> {

    let params: HttpParams = GeoDbService.buildPagingParams(request);

    params = params
      .set('radius', '' + request.location.radius)
      .set('distanceUnit', request.location.distanceUnit);

    if (request.minPopulation) {
      params = params.set('minPopulation', '' + request.minPopulation);
    }

    if (request.namePrefix) {
      params = params.set('namePrefix', request.namePrefix);
    }

    if (request.types) {
      params = params.set('types', request.types.join(','));
    }

    if (request.asciiMode) {
      params = params.set('asciiMode', '' + request.asciiMode);
    }

    if (request.languageCode) {
      params = params.set('languageCode', request.languageCode);
    }

    if (request.sortDirectives) {
      params = params.set('sort', request.sortDirectives.join(','));
    }

    if (request.includeDeleted) {
      params = params.set('includeDeleted', request.includeDeleted);
    }

    // Workaround for HttpClient '+' encoding bug.
    const locationId = GeoDbService
      .toLocationString(request.location)
      .replace('+', '%2B');

    const endpoint = this.placesEndpoint + '?location=' + locationId;

    return this.httpClient.get<GeoResponse<PlaceSummary[]>>(
      endpoint,
      {
        params: params
      }
    );
  }

  findPlacesNearPlace(request: FindPlacesNearPlaceRequest): Observable<GeoResponse<PlaceSummary[]>> {

    let params: HttpParams = GeoDbService.buildPagingParams(request);

    params = params
      .set('radius', '' + request.radius)
      .set('distanceUnit', request.distanceUnit);

    if (request.minPopulation) {
      params = params.set('minPopulation', '' + request.minPopulation);
    }

    if (request.types) {
      params = params.set('types', request.types.join(','));
    }

    if (request.asciiMode) {
      params = params.set('asciiMode', '' + request.asciiMode);
    }

    if (request.languageCode) {
      params = params.set('languageCode', request.languageCode);
    }

    if (request.sortDirectives) {
      params = params.set('sort', request.sortDirectives.join(','));
    }

    if (request.includeDeleted) {
      params = params.set('includeDeleted', request.includeDeleted);
    }

    const endpoint = this.placesEndpoint + '/' + request.placeId + '/nearbyCities';

    return this.httpClient.get<GeoResponse<PlaceSummary[]>>(
      endpoint,
      {
        params: params
      }
    );
  }

  findCountries(request: FindCountriesRequest): Observable<GeoResponse<CountrySummary[]>> {

    let params: HttpParams = GeoDbService.buildPagingParams(request);

    if (request.currencyCode) {
      params = params.set('currencyCode', request.currencyCode);
    }

    if (request.namePrefix) {
      params = params.set('namePrefix', request.namePrefix);
    }

    if (request.asciiMode) {
      params = params.set('asciiMode', '' + request.asciiMode);
    }

    if (request.languageCode) {
      params = params.set('languageCode', request.languageCode);
    }

    return this.httpClient.get<GeoResponse<CountrySummary[]>>(
      this.countriesEndpoint,
      {
        params: params
      }
    );
  }

  findCountry(request: GetCountryDetailsRequest): Observable<GeoResponse<CountryDetails>> {

    const endpoint = this.countriesEndpoint + '/' + request.countryId;

    let params: HttpParams = new HttpParams();

    if (request.asciiMode) {
      params = params.set('asciiMode', '' + request.asciiMode);
    }

    if (request.languageCode) {
      params = params.set('languageCode', request.languageCode);
    }

    return this.httpClient.get<GeoResponse<CountryDetails>>(
      endpoint,
      {
        params: params
      });
  }

  findCurrencies(request: FindCurrenciesRequest): Observable<GeoResponse<Currency[]>> {

    let params: HttpParams = GeoDbService.buildPagingParams(request);

    if (request.countryId) {
      params = params.set('countryId', request.countryId);
    }

    return this.httpClient.get<GeoResponse<Currency[]>>(
      this.currenciesEndpoint,
      {
        params: params
      }
    );
  }

  findLanguages(request: FindCollectionRequest): Observable<GeoResponse<Language[]>> {

    const params: HttpParams = GeoDbService.buildPagingParams(request);

    return this.httpClient.get<GeoResponse<Locale[]>>(
      this.languagesEndpoint,
      {
        params: params
      }
    );
  }

  findLocales(request: FindCollectionRequest): Observable<GeoResponse<Locale[]>> {

    const params: HttpParams = GeoDbService.buildPagingParams(request);

    return this.httpClient.get<GeoResponse<Locale[]>>(
      this.localesEndpoint,
      {
        params: params
      }
    );
  }

  findRegion(request: GetRegionDetailsRequest): Observable<GeoResponse<RegionDetails>> {

    const endpoint = this.buildRegionsEndpoint(request.countryId) + '/' + request.regionCode;

    let params: HttpParams = new HttpParams();

    if (request.asciiMode) {
      params = params.set('asciiMode', '' + request.asciiMode);
    }

    if (request.languageCode) {
      params = params.set('languageCode', request.languageCode);
    }

    return this.httpClient.get<GeoResponse<RegionDetails>>(
      endpoint,
      {
        params: params
      });
  }

  findRegionPlaces(request: FindRegionCitiesRequest): Observable<GeoResponse<PlaceSummary[]>> {

    const endpoint = this.buildRegionEndpoint(request.countryId, request.regionCode) + '/cities';

    let params: HttpParams = GeoDbService.buildPagingParams(request);

    if (request.minPopulation) {
      params = params.set('minPopulation', '' + request.minPopulation);
    }

    if (request.types) {
      params = params.set('types', request.types.join(','));
    }

    if (request.asciiMode) {
      params = params.set('asciiMode', '' + request.asciiMode);
    }

    if (request.languageCode) {
      params = params.set('languageCode', request.languageCode);
    }

    if (request.sortDirectives) {
      params = params.set('sort', request.sortDirectives.join(','));
    }

    return this.httpClient.get<GeoResponse<PlaceSummary[]>>(
      endpoint,
      {
        params: params
      }
    );
  }

  findRegions(request: FindRegionsRequest): Observable<GeoResponse<RegionSummary[]>> {

    const endpoint = this.buildRegionsEndpoint(request.countryId);

    let params: HttpParams = GeoDbService.buildPagingParams(request);

    if (request.namePrefix) {
        params = params.set('namePrefix', request.namePrefix);
    }

    if (request.asciiMode) {
      params = params.set('asciiMode', '' + request.asciiMode);
    }

    if (request.languageCode) {
      params = params.set('languageCode', request.languageCode);
    }

    return this.httpClient.get<GeoResponse<RegionSummary[]>>(
      endpoint,
      {
        params: params
      }
    );
  }

  findTimeZones(request: FindCollectionRequest): Observable<GeoResponse<TimeZone[]>> {

    const params: HttpParams = GeoDbService.buildPagingParams(request);

    return this.httpClient.get<GeoResponse<TimeZone[]>>(
      this.timeZonesEndpoint,
      {
        params: params
      }
    );
  }

  get apiKey(): string {
    return this.config.apiKey;
  }

  setApiKey(apiKey: string) {
    this.config.apiKey = apiKey;
  }

  getPlaceDateTime(id: string): Observable<GeoResponse<string>> {

    const endpoint = this.buildPlaceEndpoint(id) + '/dateTime';

    return this.httpClient.get<GeoResponse<string>>(endpoint);
  }

  getPlaceDistance(request: GetPlaceDistanceRequest): Observable<GeoResponse<number>> {

    const endpoint = this.buildPlaceEndpoint(request.toPlaceId) + '/distance';

    const params: HttpParams = new HttpParams()
      .set('fromPlaceId', '' + request.fromPlaceId)
      .set('distanceUnit', '' + request.distanceUnit);

    return this.httpClient.get<GeoResponse<number>>(
      endpoint,
      {
        params: params
      }
    );
  }

  getPlaceTime(placeId: string): Observable<GeoResponse<string>> {

    const endpoint = this.buildPlaceEndpoint(placeId) + '/time';

    return this.httpClient.get<GeoResponse<string>>(endpoint);
  }

  getTimeZoneDateTime(zoneId: string): Observable<GeoResponse<string>> {

    const endpoint = this.buildTimeZoneEndpoint(zoneId) + '/dateTime';

    return this.httpClient.get<GeoResponse<string>>(endpoint);
  }

  getTimeZoneTime(zoneId: string): Observable<GeoResponse<string>> {

    const endpoint = this.buildTimeZoneEndpoint(zoneId) + '/time';

    return this.httpClient.get<GeoResponse<string>>(endpoint);
  }

  private buildPlaceEndpoint(olaceId: string): string {
    return this.placesEndpoint + '/' + olaceId;
  }

  private buildRegionEndpoint(countryId: string, regionCode: string): string {
    return this.buildRegionsEndpoint(countryId) + '/' + regionCode;
  }

  private buildRegionsEndpoint(countryId: string): string {
    return this.countriesEndpoint + '/' + countryId + '/regions';
  }

  private buildTimeZoneEndpoint(zoneId: string): string {
    return this.timeZonesEndpoint + '/' + zoneId;
  }
}
