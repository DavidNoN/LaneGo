import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {GeoDbConfig} from './model/geodb-config.model';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private config: GeoDbConfig) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request.url.startsWith(this.config.serviceUri)) {
      const headers: HttpHeaders = request
        .headers
        .set('X-Mashape-Key', this.config.apiKey);

      return next.handle(request.clone({headers: headers}));
    }

    return next.handle(request);
  }
}
