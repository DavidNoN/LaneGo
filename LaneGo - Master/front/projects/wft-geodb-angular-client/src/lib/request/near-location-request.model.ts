import {GeoLocation} from '../model/geo-location.model';

export interface NearLocationRequest extends GeoLocation {
  radius: number;
  distanceUnit: string;
}
