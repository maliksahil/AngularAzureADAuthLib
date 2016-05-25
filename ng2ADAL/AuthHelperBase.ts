import { Injectable } from '@angular/core';

@Injectable()
export class AuthHelperBase {
    public isUserAuthenticated(): boolean {
        let access_token = window.localStorage.getItem("access_token");
        return access_token != null;
    }
    
    public getAccessToken() {
        var accessToken = window.localStorage.getItem("access_token");
        if (accessToken == null) {
            this.logIn(window.location.href);
        } else {
            return accessToken;
        }
    }
        
    public logIn(state = "/") {
        alert("This needs to be implemented in the inherited class. If you are seeing this, it's a framework bug");
    }
    
    logOut(state = "/") {
        alert("This needs to be implemented in the inherited class. If you are seeing this, it's a framework bug");
    }   
}

export class ServiceConstants {
    constructor(public clientID:string, public tenantID:string, public redirectURL:string, public graphResource = "https://graph.microsoft.com") {}
}