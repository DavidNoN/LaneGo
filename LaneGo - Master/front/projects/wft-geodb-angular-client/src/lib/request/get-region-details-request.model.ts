export interface GetRegionDetailsRequest {
  countryId: string;
  regionCode: string;

  asciiMode?: boolean;
  languageCode?: string;
}
