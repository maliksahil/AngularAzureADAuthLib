import {Inject, Injectable } from '@angular/core';
import {ServiceConstants} from './ServiceConstants';

import {JwtHelper} from './JwtHelper';

@Injectable()
export class AuthHelperBase {

    public isUserAuthenticated(): boolean {
        let access_token = this.getAccessToken();
        return access_token != null;
    }

    public getAccessToken():string {
        return "This needs to be implemented in the inherited class.";
    }

    public logIn(state = "/") {
        console.log("This needs to be implemented in the inherited class.");
    }

    public logOut(state = "/") {
        console.log("This needs to be implemented in the inherited class.");
    }

    public get userName() {
        var jwtHelper = new JwtHelper();        
        var parsedToken = jwtHelper.decodeToken(this.getAccessToken());

        var expiryTime = new Date(parsedToken.exp * 1000);
        var now = new Date();
        if (now > expiryTime) this.logOut();        
        
        return parsedToken.upn;
    }

    public ServiceConstants(): ServiceConstants {
        alert("This needs to be implemented in the inherited class.");
        return null;
    }
}