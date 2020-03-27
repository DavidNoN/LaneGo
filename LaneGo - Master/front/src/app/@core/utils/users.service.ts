import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export class Track {
    name: string;
    artist: string;
    url: string;
    cover: string;
}

@Injectable()
export class UsersService {



    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Alllow-Credentials': 'true'
    }

    constructor(private http: HttpClient) { }

    current: number;
    public updateInfo(updateform) {
        try {
            console.log({ form: updateform });
            return this.http.post(environment.apiUrl + 'users/updateinfo', {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': '*',
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Alllow-Credentials': 'true'
                },
                params: { form: JSON.stringify(updateform) }
            });
        } catch (error) {
            console.error(error);
        }
    }
}
