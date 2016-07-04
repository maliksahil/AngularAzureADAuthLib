import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

import {AuthHelperBase} from './AuthHelperBase';
import { ServiceConstants } from "./ServiceConstants";

@Injectable()
export class AzureADAuthHelper extends AuthHelperBase {
    private parseQueryString = function (url: string) {
        var params = {};
        var queryString = "";
        if (url.search("#") != -1) {
            queryString = url.substring(url.search("#") + 1);

        } else {
            queryString = url.substring(url.indexOf("?") + 1);
        }
        var a = queryString.split('&');
        for (var i = 0; i < a.length; i++) {
            var b = a[i].split('=');
            params[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
        }
        return params;
    }

    private params = this.parseQueryString(location.hash);

    constructor(private _serviceConstants: ServiceConstants) {
        super();
        // do we have an access token, if so add the iframe renewer
        if (window.localStorage.getItem("access_token")) {
            var iframe = document.createElement('iframe');
            iframe.style.display = "none";
            iframe.src = "/IF/BIF/Framework/Authentication/renewToken.html?tenantID=" +
                encodeURIComponent(this._serviceConstants.tenantID) +
                "&clientID=" + encodeURIComponent(this._serviceConstants.clientID) +
                "&resource=" + encodeURIComponent(this._serviceConstants.graphResource);
            window.onload = function () {
                document.body.appendChild(iframe);
            }
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
        this.logIn(state); // force login, assume that renewToken.html didn't work which is why dev is calling this.
    }

    public getAccessToken() {
        return window.localStorage.getItem("access_token");
    }

    public ServiceConstants() {
        return this._serviceConstants;
    }
}

function error(err) {
    console.error(JSON.stringify(err, null, 4));
}