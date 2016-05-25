import { Injectable } from '@angular/core';
import {AuthHelperBase} from './AuthHelperBase';

@Injectable()
export class Authenticator {
    constructor(private _authHelperBase:AuthHelperBase) { }    
    public isUserAuthenticated():boolean {return this._authHelperBase.isUserAuthenticated();}
    public logIn(state = "/") {this._authHelperBase.logIn(state);}
    public logOut(state = "/") {this._authHelperBase.logOut(state);}
    public getAccessToken() {return this._authHelperBase.getAccessToken();}
}