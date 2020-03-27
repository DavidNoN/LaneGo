import {FindCollectionRequest} from './find-collection-request.model';
import {NearLocationRequest} from './near-location-request.model';

export interface FindPlacesNearLocationRequest extends FindCollectionRequest {
  location: NearLocationRequest;

  minPopulation?: number;
  namePrefix?: string;
  types?: Array<string>;

  asciiMode?: boolean;
  languageCode?: string;

  sortDirectives?: Array<string>;

  includeDeleted?: string;
}
