import {FindCollectionRequest} from './find-collection-request.model';

export interface FindCurrenciesRequest extends FindCollectionRequest {
  countryId?: string;
}
