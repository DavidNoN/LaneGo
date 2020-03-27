import {FindCollectionRequest} from './find-collection-request.model';

export interface FindRegionCitiesRequest extends FindCollectionRequest {
  countryId: string;
  regionCode: string;

  minPopulation?: number;
  types?: Array<string>;

  asciiMode?: boolean;
  languageCode?: string;

  sortDirectives?: Array<string>;

  includeDeleted?: string;
}
