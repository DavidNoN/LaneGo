import {FindCollectionRequest} from './find-collection-request.model';

export interface FindCountriesRequest extends FindCollectionRequest {
  currencyCode?: string;
  namePrefix?: string;

  asciiMode?: boolean;
  languageCode?: string;
}
