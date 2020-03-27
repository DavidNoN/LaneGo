import {FindCollectionRequest} from './find-collection-request.model';

export interface FindRegionsRequest extends FindCollectionRequest {
  countryId: string;

  namePrefix?: string;

  asciiMode?: boolean;
  languageCode?: string;
}
