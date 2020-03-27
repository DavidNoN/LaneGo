# GeoDB Angular Client

This library provides Angular client bindings to the [GeoDB](http://geodb-cities-api.wirefreethought.com/) service.

## Setup

1. ``cd`` into your Angular project root.

2. ``npm install wft-geodb-angular-client@latest --save``

If using the FREE instance, update your ``AppModule.ts`` as follows:
```
@NgModule({
  declarations: [
    ...
  ],
  imports: [
    ...
    GeoDbFreeModule.forRoot({
      apiKey: null,
      serviceUri: http://geodb-free-service.wirefreethought.com
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Otherwise, if using the PRO instance:

1. Create an account on [RapidAPI](https://rapidapi.com). As part of account creation, Rapid asks for credit-card info. As long as you stay within the free usage limits of the Basic plan, your credit card will not be charged.
2. [Select](https://rapidapi.com/wirefreethought/api/GeoDB%20Cities/pricing) a GeoDB plan.
5. Update your ``AppModule.ts`` as follows:
    ```
    @NgModule({
      declarations: [
        ...
      ],
      imports: [
        ...
        GeoDbProModule.forRoot({
          apiKey: YOUR_MASHAPE_KEY,
          serviceUri: https://wft-geo-db.p.mashape.com
        })
      ],
      bootstrap: [AppComponent]
    })
    export class AppModule { }
    ```

## Usage

In your Typescript class:

``constructor(private geoDbService: GeoDbService) { }``

Later on, in some method:

```
this.geoDbService.someMethod({
    someRequestParam: value,
    someOtherRequestParam: value,
    ...
  })
  .subscribe(
    (response: GeoResponse<TheResponsePayloadType>) => {
        // Do your thing!
      }
  )
```

## Cookbook

Find all cities in the US starting with *San* and having a minimum population of 100,000 (first 10 results):
```
this.geoDbService.findPlaces({
    namePrefix: "San",
    countryIds: ["US"],
    minPopulation: 100000,
    types: ["CITY"],
    limit: 10,
    offset: 0
  })
  .subscribe(
    (response: GeoResponse<PlaceSummary[]>) => {
      const totalCount = response.metadata.totalCount;
      let data: PlaceSummary[] = response.data;

      // Do your thing!
    }
  );
```

Find all cities and towns in the Los Angeles area and having a minimum population of 50,000 - sorting by population, descending (first 10 results):
```
this.geoDbService.findPlaceById("Q65")
  .subscribe(
    (placeByIdResponse: GeoResponse<PlaceDetails> => {
      const placeLocation: GeoLocation = placeByIdResponse.data.location;

      this.geoDbService.findPlacesNearLocation({
          location: {
            latitude: cityLocation.latitude,
            longitude: cityLocation.longitude,
            radius: 50,
            radiusUnit: "MI"
          },
          minPopulation: 50000,
          types: ["CITY"],          
          sortDirectives: [
            "-population"
          ],
          limit: 10,
          offset: 0
        })
        .subscribe(
          (citiesNearLocationResponse: GeoResponse<PlaceSummary[]>) => {
            const totalCount = citiesNearLocationResponse.metadata.totalCount;
            let data: PlaceSummary[] = citiesNearLocationResponse.data;

            // Do your thing!
        }
      );
    }
  );
```

Find all cities in California having a minimum population of 100,000 - sorting by population, ascending (first 10 results):
```
this.geoDbService.findRegionPlaces({
    countryId: "US",
    regionCode: "CA",
    minPopulation: 100000,
    types: ["CITY"],        
    sortDirectives: [
      "population"
    ],
    limit: 10,
    offset: 0
  })
  .subscribe(
    (response: GeoResponse<PlaceSummary[]>) => {
      const totalCount = response.metadata.totalCount;
      let data: PlaceSummary[] = response.data;

      // Do your thing!
    }
  );

```

Find all cities in the Los Angeles and New York time-zones - sorting by elevation, ascending, then population, descending (first 10 results):
```
this.geoDbService.findPlaces({
    timeZoneIds: [
      "America__Los_Angeles, America__New_York"
    ],
    ypes: ["CITY"],
    sortDirectives: [
      "elevation",
      "-population"
    ],
    limit: 10,
    offset: 0
  })
  .subscribe(
    (response: GeoResponse<PlaceSummary[]>) => {
      const totalCount = response.metadata.totalCount;
      let data: PlaceSummary[] = response.data;

      // Do your thing!
    }
  );

```

See the [sample app](https://github.com/wirefreethought/geodb-sample-angular-app) for more detailed examples.

## API Docs
For detailed REST docs, [go here](http://geodb-cities-api.wirefreethought.com/docs/api).
