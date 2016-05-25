import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

import {AuthHelperBase} from './AuthHelperBase';
import { ServiceConstants } from "./serviceConstants";

@Injectable()
export class AzureADAuthHelper extends AuthHelperBase {
    private parseQueryString = function (url) {
        var params = {}, queryString = url.substring(1),
            regex = /([^&=]+)=([^&]*)/g, m;
        while (m = regex.exec(queryString)) {
            params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
        }
        return params;
    }
        
    private params = this.parseQueryString(location.hash);

    constructor(private _serviceConstants:ServiceConstants) {
        super();
        // do we have an access token, if so add the iframe renewer
        if (window.localStorage.getItem("access_token")) {
            var iframe = document.createElement('iframe');
            iframe.style.display = "none";
            iframe.src = "/ng2Adal/renewToken.html?tenantID=" + 
                encodeURIComponent(this._serviceConstants.tenantID) + 
                "&clientID=" + encodeURIComponent(this._serviceConstants.clientID) + 
                "&resource=" + encodeURIComponent(this._serviceConstants.graphResource);
            document.body.appendChild(iframe);
        }
        if (this.params["id_token"] != null) {
            window.localStorage.setItem("id_token", this.params["id_token"]);
            // redirect to get access token here..
            window.location.href = "https://login.microsoftonline.com/" + this._serviceConstants.tenantID +
                "/oauth2/authorize?response_type=token&client_id=" + this._serviceConstants.clientID +
                "&resource=" + this._serviceConstants.graphResource +
                "&redirect_uri=" + encodeURIComponent(window.location.href) +
                "&prompt=none&state=" + this.params["state"] + "&nonce=SomeNonce";
        }
        else if (this.params["access_token"] != null) {
            window.localStorage.setItem("access_token", this.params["access_token"]);
            // redirect to the original call URl here.
            window.location.href = this.params["state"];
        }        
    }
    
    logIn(state = "/") {
        window.location.href = "https://login.microsoftonline.com/" + this._serviceConstants.tenantID +
            "/oauth2/authorize?response_type=id_token&client_id=" + this._serviceConstants.clientID +
            "&redirect_uri=" + encodeURIComponent(window.location.href) +
            "&state=" + state + "&nonce=SomeNonce";
    }

    logOut(state = "/") {
        window.localStorage.removeItem("id_token");
        window.localStorage.removeItem("access_token");
        window.location.href = state;
    }

    refreshAccessToken(state = "/") {
        this.logIn(state); // should never be a reason to call this manually, because the iframe will automatically renew this for you.        
    }
}