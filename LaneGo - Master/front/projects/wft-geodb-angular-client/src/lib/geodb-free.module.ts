import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {ModuleWithProviders, NgModule} from '@angular/core';

import {GeoDbService} from './geodb.service';
import {GeoDbConfig} from './model/geodb-config.model';

@NgModule({
  providers: [
    GeoDbService
  ],
  imports: [
    HttpClientModule
  ]
})
export class GeoDbFreeModule {
  static forRoot(config: GeoDbConfig): ModuleWithProviders {
    return {
      ngModule: GeoDbFreeModule,
      providers: [
        {provide: GeoDbConfig, useValue: config}
      ]
    };
  }

  constructor(config: GeoDbConfig) {
  }
}
