import { Injectable, Inject } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Authenticator} from './Authenticator';
import {Observable, Subscriber} from 'rxjs';

@Injectable()
export class AuthenticatedHttpService {
  private _authenticator:Authenticator;
  private _http:Http;
  constructor( @Inject(Http) http: Http, @Inject(Authenticator) authenticator: Authenticator) { 
    this._authenticator = authenticator;
    this._http = http;
  }

  createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', 'Bearer ' + this._authenticator.getAccessToken());
  }

  get(url) {
    var promise = new Promise((resolve, reject) => {
      let headers = new Headers();
      this.createAuthorizationHeader(headers);
      var observable = this._http.get(url, { headers: headers });
      observable.subscribe(
        res => {
          resolve(res.json());
        },
        err => {
          if (err.status == 401) {
            this._authenticator.logIn();
          } else reject(err);
        });
    });
    return promise;
    // return this.http.get(url, { headers: headers });
  }

  post(url, data) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this._http.post(url, data, {
      headers: headers
    });
  }
}