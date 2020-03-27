import { Injectable } from '@angular/core';

@Injectable()
export class UsersService {



    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Alllow-Credentials': 'true'
    }

    constructor() { }

    current: number;
    public updateInfo(updateform) {
        try {
            console.log({ form: updateform });
        } catch (error) {
            console.error(error);
        }
    }
}

@Injectable()
export class CitiesService {
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Alllow-Credentials': 'true'
    }

    constructor() { }

    current: number;
    public getCities() {
        debugger
        // cities;
    }
}
