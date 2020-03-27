import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class BriefcaseService {
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Alllow-Credentials': 'true'
    }

    constructor(private http: HttpClient) { }

    current: number;
    public addPublication(pub) {
        try {
            console.log({ form: pub });
            return this.http.post(environment.apiUrl + 'briefcase/add', pub);
        } catch (error) {
            console.error(error);
        }
    }

    public getPortfolio(id) {
        try {
            return this.http.get(environment.apiUrl + 'briefcase/get', 
            {
                params: {userId: id}
            });
        } catch (error) {
            console.error(error);
        }
    }

    public deletePub(id) {
        try {
            return this.http.get(environment.apiUrl + 'briefcase/delete', 
            {
                params: {id}
            });
        } catch (error) {
            console.error(error);
        }
    }
}

