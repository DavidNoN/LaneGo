export class PlaceSummary {
  id: string;
  wikiDataId: string;

  city: string;
  country: string;
  countryCode: string;
  latitude: number;
  longitude: number;
  name: string;
  region: string;
  regionCode: string;
  type: string;

  // Only included if the result of a location-constrained request
  distance: number;

  get displayName(): string {
    return this.region != null && this.region.trim().length > 0
      ? this.name + ', ' + this.region + ', ' + this.country
      : this.name + ', ' + this.country;
  }
}
