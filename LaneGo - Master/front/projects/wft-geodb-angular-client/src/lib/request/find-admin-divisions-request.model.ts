import {FindCollectionRequest} from './find-collection-request.model';

export interface FindAdminDivisionsRequest extends FindCollectionRequest {
  countryIds?: Array<string>;
  excludedCountryIds?: Array<string>;
  minPopulation?: number;
  namePrefix?: string;
  timeZoneIds?: Array<string>;

  asciiMode?: boolean;
  languageCode?: string;

  sortDirectives?: Array<string>;

  includeDeleted?: string;
}
