import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Alllow-Credentials': 'true',
  }
  constructor(private http: HttpClient) { }
  
  public getInstruments() {
    try {
      return this.http.get(environment.apiUrl + 'query/instruments',
      {
        headers: this.headers,
      },
      );
    } catch (error) {
      console.error(error);
    }
  }
  
  public getGenres() {
    try {
      return this.http.get(environment.apiUrl + 'query/genres',
      {
        headers: this.headers,
      },
      );
    } catch (error) {
      console.error(error);
    }
  }
  
  getGenresById(id) {
    try {
      return this.http.get(environment.apiUrl + 'query/genresbyid',
      {
        headers: this.headers,
        params: {param: JSON.stringify({id})}
      },
      );
    } catch (error) {
      console.error(error);
    }
  }
  
  getInstrumentsById(id) {
    try {
      return this.http.get(environment.apiUrl + 'query/instrumentsbyid',
      {
        headers: this.headers,
        params: {param: JSON.stringify({id})}
      },
      );
    } catch (error) {
      console.error(error);
    }
  }
  public search(filter){
    try {
        let a = filter;
        console.log('searching: ', filter);
        return this.http.get(environment.apiUrl + 'query/search', {
          headers: this.headers, 
          params : {searchFilter: filter}});
    } catch (error) { 
      console.error(error);
    }
  }
  
}
